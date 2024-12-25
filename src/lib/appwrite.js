import { Account, Client, Databases, ID, Query } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  projectId: '673034da00188e05b86c',
  databaseId: '6731408200127d6e8929',
  collectionId: '67356a41003ad8567aed',
  designCollectionId: '676366c100128c9b5b26',
};

const client = new Client().setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId);

const account = new Account(client);
const databases = new Databases(client);

async function createUserDocument(accountData, retryCount = 0) {
  const timestamp = new Date().toISOString();
  const userData = {
    userId: accountData.$id,
    email: accountData.email,
    username: accountData.name,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  try {
    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collectionId,
      ID.unique(),
      userData
    );
  } catch (error) {
    console.error(`Attempt ${retryCount + 1} failed:`, error);

    // Log the exact data we're trying to send
    console.log('Attempting to create document with data:', JSON.stringify(userData, null, 2));

    if (retryCount < 2) {
      // Try up to 3 times
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
      return createUserDocument(accountData, retryCount + 1);
    }
    throw error;
  }
}

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    const userData = await getCurrentUser();
    return { session, userData };
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    let session;
    try {
      session = await account.getSession('current');
    } catch (error) {
      console.log('No valid session');
      return null;
    }

    const currentAccount = await account.get();

    try {
      const users = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.collectionId, [
        Query.equal('userId', currentAccount.$id), //compare the userId field in the database with the current account id
      ]);

      if (!users.documents.length) {
        console.log('No user document found, creating one...');
        const newUser = await createUserDocument(currentAccount);
        return {
          ...newUser,
          accountDetails: currentAccount,
        };
      }

      return {
        ...users.documents[0],
        accountDetails: currentAccount,
      };
    } catch (error) {
      console.error('Database operation error:', error);
      throw error;
    }
  } catch (error) {
    console.error('GetCurrentUser error:', error);
    return null;
  }
}

export async function getID() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount || !currentAccount.$id) {
      throw new Error('No valid account found');
    }
    return currentAccount.$id;
  } catch (error) {
    console.error('Error getting user ID:', error);
    return null;
  }
}

export async function createUser(email, password, username) {
  try {
    // Step 1: Create the Appwrite account
    const newAccount = await account.create(ID.unique(), email, password, username);
    console.log('Account created successfully:', newAccount.$id);

    // Step 2: Create the user document with retry mechanism
    console.log('Creating user document...');
    const newUser = await createUserDocument(newAccount);
    console.log('User document created successfully');

    // Step 3: Create session
    console.log('Creating session...');
    const { session } = await signIn(email, password);
    console.log('Session created successfully');

    return {
      user: newUser,
      session: session,
    };
  } catch (error) {
    console.error('Create user error:', error);
    // If account was created but document creation failed, attempt cleanup
    if (error.message.includes('Missing required attribute')) {
      console.log('Schema validation error. Current schema requirements:');
      console.log('Required fields: userId, email, username, createdAt, updatedAt');
      console.log('Please verify all required fields are present in your schema');
    }
    throw error;
  }
}

export async function signOut() {
  try {
    await account.deleteSession('current');
    console.log('Signed out successfully');
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

// using this to save the user's designs, called from timerVariantStore item id is passed

export async function saveUserDesigns(designId) {
  const currentAccount = await account.get();
  try {
    // Query the database to find the document associated with the current user's ID
    const response = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.collectionId, [
      Query.equal('userId', currentAccount.$id), //this statement retrives the document and checks if the userId field in the database matches the current account id
    ]);

    const userDocument = response.documents[0];

    // update the document with the new id
    await databases.updateDocument(appwriteConfig.databaseId, appwriteConfig.collectionId, userDocument.$id, {
      designId: JSON.stringify(designId),
    });

    console.log('saved');
  } catch (error) {
    console.log('error', error);
  }
}

export async function loadUserDesigns() {
  const currentAccount = await account.get();
  try {
    // Query the database to find the document associated with the current user's ID
    const response = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.collectionId, [
      Query.equal('userId', currentAccount.$id), //this statement retrives the document and checks if the userId field in the database matches the current account id
    ]);

    const userDocument = response.documents[0];

    // update the document with the new id
    return JSON.parse(userDocument.designId);
  } catch (error) {
    console.log('error', error);
  }
}

export { client, account, databases };
