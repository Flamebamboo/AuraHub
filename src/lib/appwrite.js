import { Account, Client, Databases, ID, Query } from 'react-native-appwrite';
import {
  ENDPOINT,
  PROJECT_ID,
  DATABASE_ID,
  COLLECTION_ID,
  FOCUS_SESSION_COLLECTION_ID,
  FOCUS_ITEM_COLLECTION_ID,
  USER_PURCHASES_COLLECTION_ID,
} from '@env';
export const appwriteConfig = {
  endpoint: ENDPOINT,
  projectId: PROJECT_ID,
  databaseId: DATABASE_ID,
  collectionId: COLLECTION_ID,
  focusItemCollectionId: FOCUS_ITEM_COLLECTION_ID,
  focusSessionCollectionId: FOCUS_SESSION_COLLECTION_ID,
  userPurchasesCollectionId: USER_PURCHASES_COLLECTION_ID,
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

export async function getUserDetails() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount || !currentAccount.$id) {
      throw new Error('No valid account found');
    }
    return {
      userId: currentAccount.$id,
      email: currentAccount.email,
    };
  } catch (error) {
    console.error('Error getting user details:', error);
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

export { client, account, databases };
