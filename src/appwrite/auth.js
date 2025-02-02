import conf from '../conf/conf.js'

import { Client, Account, ID} from 'appwrite'
export class AuthService{
    client=new Client();
    account;
    constructor(){
     this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
    this.account=new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount=await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                return this.login({email,password})
            }else{
                return err;
            }
        } catch (err) {
            return err;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            return error;
        }
    }

    async getCurrentUser(){
        try {
            
             this.account.get().then((res)=>{console.log("res is",res)})
           

        } catch (error) {
            console.log("error in verification",error)
        }
        return null;
    }
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("error is logout",error)
        }
    }
}
const authService=new AuthService();
export default authService;