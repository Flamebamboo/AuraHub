import { Client, Databases, ID } from 'react-native-appwrite';

const client = new Client().setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId);

import { getID, appwriteConfig } from '@/lib/appwrite';
const databases = new Databases(client);

/* I want to create focus stats for now only duration stats 
this requires me to fetch data from the focus hooks suck as 
useTimer and usePomodoro afterwards we will send that data to 
a store containing date started, date ended, calculate those time 
and append to the the total focus time, there will also filter 
function to sort the date by day e.g total focus today, etc. 
the next thing is from the focusStats.js we send that data to the */

export async function saveFocusStats(stats, task) {
  if (!stats) return;
  const userId = await getID();
  console.log('User ID:', userId);
  console.log(stats.totalDuration);
  const sessionData = {
    startTime: stats.startTime.toISOString(),
    endTime: stats.endTime.toISOString(),
    totalDuration: stats.totalDuration,
    task,
    userId,
  };

  try {
    console.log('Database ID:', appwriteConfig.databaseId);
    console.log('Collection ID:', appwriteConfig.focusSessionCollectionId);
    console.log('Session Data:', sessionData);
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.focusSessionCollectionId,
      ID.unique(), // Generate unique document ID
      sessionData
    );
    return sessionData;
  } catch (error) {
    console.error('Failed to save focus stats:', error);
    throw error;
  }
}

//TO DO create index for focus stats in appwrite
