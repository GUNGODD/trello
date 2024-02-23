import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import {MongoDBAdapter} from '@next-auth/mongodb-adapter'
import clientPromise from "@/lib/mongoClient"; 

//@ts-ignore


export const authOptions:AuthOptions = {
    secret: process.env.AUTH_SECRET,
    // providers: [
    //  GitHubProvider({
    //     clientId: process.env.GITHUB_CLIENT_ID as string,
    //     clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    //   }),
    // ],
    providers : [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_ID_SECRET as string,
      }),
    ],
      // @ts-ignore
      adapter: MongoDBAdapter(clientPromise),
  };




