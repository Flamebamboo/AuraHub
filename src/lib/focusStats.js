import { Client, Databases, ID, Query } from 'react-native-appwrite';

const client = new Client().setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId);

import { getUserDetails, appwriteConfig } from '@/lib/appwrite';
const databases = new Databases(client);

/* I want to create focus stats for now only duration stats 
this requires me to fetch data from the focus hooks suck as 
useTimer and usePomodoro afterwards we will send that data to 
a store containing date started, date ended, calculate those time 
and append to the the total focus time, there will also filter 
function to sort the date by day e.g total focus today, etc. 
the next thing is from the focusStats.js we send that data to the */
export async function getByDay() {
  const userDetails = await getUserDetails();

  try {
    // date is a JavaScript Date object for the specific day
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // hours, minutes, seconds, milliseconds

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Query sessions where start_time or end_time falls in [startOfDay, endOfDay]

    const response = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.focusSessionCollectionId, [
      Query.equal('user_id', userDetails.userId),
      Query.greaterThanEqual('start_time', startOfDay.toISOString()),
      Query.lessThanEqual('end_time', endOfDay.toISOString()),
    ]);

    const sessions = response.documents;

    // Calculate total focus time for the day

    const totalFocusTime = sessions.reduce((accu, current) => {
      return accu + current.total_duration;
    });

    //group the session by task and color and calculate total duration for each
    const groupTask = {};
    for (const session of sessions) {
      if (!groupTask[session.task]) {
        groupTask[session.task] = {};
      }
      if (!groupTask[session.task][session.color]) {
        groupTask[session.task][session.color] = 0;
      }
      groupTask[session.task][session.color] += session.total_duration; // this returns the total duration for each task and color
    }
    console.log('groupTask:', groupTask);
    return {
      totalFocusTime,
      groupTask,
    };
  } catch (error) {
    console.error('Failed to get focus stats:', error);
    throw error;
  }
}

export async function saveFocusStats(stats, task, color) {
  if (!stats) return;
  const userDetails = await getUserDetails();

  const sessionData = {
    start_time: stats.startTime.toISOString(),
    end_time: stats.endTime.toISOString(),
    total_duration: stats.totalDuration,
    task,
    color,
    user_id: userDetails.userId,
    email: userDetails.email,
  };

  try {
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

  //Retrieving focus stats from appwrite database
}

//TO DO create index for focus stats in appwrite
