import { Client, Databases, Account } from "react-native-appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("673034da00188e05b86c"); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
