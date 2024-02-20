import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import {MongoDBAdapter} from '@next-auth/mongodb-adapter'
import clientPromise from "@/lib/mongoClient"; 

//@ts-ignore

export  const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          }),
        
    ],
}; 
 // ts-ignore  
 // adapter 
  adapter: MongoDBAdapter(clientPromise)




