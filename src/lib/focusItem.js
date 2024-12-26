import { Client, Databases, Query, ID } from 'react-native-appwrite';
import { appwriteConfig, getUserDetails } from '@/lib/appwrite';
const client = new Client().setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId);

const databases = new Databases(client);

// using this to save the user's designs, called from timerVariantStore item id is passed

// NOTE there is two collection being used here, the focusItemCollectionId and the userPurchasesCollectionId
// the focusItemCollectionId is used to store the designs that are available in the shop
// the userPurchasesCollectionId is used to store the designs that the user has purchased

export async function saveUserDesigns(designId) {
  try {
    const userDetails = await getUserDetails();
    console.log('User ID:', userId);
    // Query the database to find the document associated with the current user's ID
    const response = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userPurchasesCollectionId,
      ID.unique(),
      {
        user_id: userDetails.$id,
        item_id: JSON.stringify(designId),
        purchase_date: new Date().toISOString(),
        email: userDetails.email,
      }
    );

    console.log('Created new document:', response);
  } catch (error) {
    console.log('error fuck', error);
  }
}

export async function loadUserDesigns() {
  try {
    const userDetails = await getUserDetails();
    // Query the database to find the document associated with the current user's ID
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userPurchasesCollectionId,
      [Query.equal('user_id', userDetails.$id)]
    );

    return response.documents.map((doc) => doc.item_id);
  } catch (error) {
    console.log('error fucks', error);
  }
}

//fetching to display on the shop

export async function fetchDesigns() {
  try {
    const response = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.focusItemCollectionId);
    return response.documents;
  } catch (err) {
    console.log('error', err);
  }
}

// TO DO transfer the focusItem func from appwrite to here to make it cleaner
