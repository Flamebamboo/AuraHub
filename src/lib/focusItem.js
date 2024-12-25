import { Client, Databases } from 'appwrite';
import { appwriteConfig } from '@/lib/appwrite';

const client = new Client().setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId);

const databases = new Databases(client);

// TO DO transfer the focusItem func from appwrite to here to make it cleaner
