import conf from '../conf/conf.js'

import { Client, Databases, ID, Query, Storage} from 'appwrite'
export class Service{
    client=new Client();
    database;
    bucket;

    constructor(){
     this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
    this.database=new Databases(this.client);
    this.bucket=new Storage(this.client);
    }

    async createPost({title,slug, content,featuredImg,status, userId}){
        try {
            return await this.database.createDocument(conf.appwriteDatabaseId,
            conf.appwriteCollectionId, 
            slug,
            {title, content,featuredImg,status, userId});
        } catch (error) {
            console.log(error)
        }
    }

    async updatePost(slug,{title,content,featuredImg,status}){
        try {
            return await this.database.updateDocument(conf.appwriteDatabaseId,
            conf.appwriteCollectionId, 
            slug,
            {title, content,featuredImg,status});
        } catch (error) {
            console.log(error)
        }
    }

    async deletePost(slug){
        try {
            await this.database.deleteDocument(
            conf.appwriteDatabaseId, // databaseId
            conf.appwriteCollectionId, // collectionId
            slug // documentId
        );
        return true
        } catch (error) {
            console.log(error)
            return false
        }
      
    }

    async getPost(slug){
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("error in slug")
            return false;
        }
}
    async getPosts(quieries=[Query.equal["status","active"]]){
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
               quieries
            )
        } catch (error) {
            console.log("error in slug")
            return false;
        }
}

async uploadFile(file){
    try {
        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log("error in upload",error)
    }
}
async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
        return true;
    } catch (error) {
        console.log("error in deleting file",error)
    }
}

    getFilePreview(fileId){
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    }


}
const service=new Service();
export default service;