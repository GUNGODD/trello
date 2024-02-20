import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import {MongoDBAdapter} from '@next-auth/mongodb-adapter'
const handler = NextAuth({
 providers : [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),

 ],
 // adapter 
  adapter: MongoDBAdapter(clientPromise),
});

export { handler as GET, handler as POST }