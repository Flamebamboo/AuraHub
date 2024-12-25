import { Client, Databases, Query } from 'react-native-appwrite';
import { appwriteConfig, getID } from '@/lib/appwrite';
const client = new Client().setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId);

const databases = new Databases(client);
const userId = getID();
// using this to save the user's designs, called from timerVariantStore item id is passed

export async function saveUserDesigns(designId) {
  try {
    // Query the database to find the document associated with the current user's ID
    const response = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.collectionId, [
      Query.equal('userId', userId), //this statement retrives the document and checks if the userId field in the database matches the current account id
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
  try {
    // Query the database to find the document associated with the current user's ID
    const response = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.collectionId, [
      Query.equal('userId', userId), //this statement retrives the document and checks if the userId field in the database matches the current account id
    ]);

    const userDocument = response.documents[0];

    // update the document with the new id
    return JSON.parse(userDocument.designId);
  } catch (error) {
    console.log('error', error);
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
