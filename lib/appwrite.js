import { Client, Account, ID } from "react-native-appwrite";

export const Config = {
  endpoint: "https://cloud.write.io/v1",
  platform: "com.flamebamboo.StudyHub",
  projectId: "673034da00188e05b86c",
  database: "6731408200127d6e8929",
  userCollectionId: "673140b400203cb6b6cf",
};

const client = new Client();
client
  .setEndpoint(Config.endpoint)
  .setProject(Config.projectId) // Replace with your project ID
  .setPlatform(Config.platform);

const account = new Account(client);

const createUser = () => {
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (response) {
      console.log("User created:", response);
    },
    function (error) {
      console.log(error);
    }
  );
};

export default createUser;
