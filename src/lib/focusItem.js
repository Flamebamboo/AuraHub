import { Client, Databases, Query, ID } from 'react-native-appwrite';
import { appwriteConfig, getID } from '@/lib/appwrite';
const client = new Client().setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId);

const databases = new Databases(client);
const userId = getID();
// using this to save the user's designs, called from timerVariantStore item id is passed

// NOTE there is two collection being used here, the focusItemCollectionId and the userPurchasesCollectionId
// the focusItemCollectionId is used to store the designs that are available in the shop
// the userPurchasesCollectionId is used to store the designs that the user has purchased

export async function saveUserDesigns(designId) {
  try {
    const userId = await getID();
    console.log('User ID:', userId);
    // Query the database to find the document associated with the current user's ID
    const response = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userPurchasesCollectionId,
      ID.unique(),
      {
        user_id: userId,
        item_id: JSON.stringify(designId),
        purchase_date: new Date().toISOString(),
      }
    );

    console.log('Created new document:', response);
  } catch (error) {
    console.log('error fuck', error);
  }
}

export async function loadUserDesigns() {
  try {
    const userId = await getID();
    // Query the database to find the document associated with the current user's ID
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userPurchasesCollectionId,
      [Query.equal('user_id', userId)]
    );

    return response.documents.map((doc) => doc.itemId);
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
