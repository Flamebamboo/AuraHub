import { Client, Databases } from 'appwrite';

import { appwriteConfig } from '@/lib/appwrite';
const client = new Client()
  .setEndpoint(appwriteConfig.endpoint) // Your API Endpoint
  .setProject(appwriteConfig.projectId);

const databases = new Databases(client);

export async function getFocusItems() {
  try {
    const result = await databases.listDocuments(
      '6731408200127d6e8929', // databaseId
      '675f8f0700025fb216e7' // collectionId
    );
    console.log(result);
    return result;
  } catch (error) {
    console.error('error stuff', error);
    throw error;
  }
}
