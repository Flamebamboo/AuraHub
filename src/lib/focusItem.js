import { Client, Databases } from 'appwrite';
import { appwriteConfig } from '@/lib/appwrite';

const client = new Client().setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId);

const databases = new Databases(client);
