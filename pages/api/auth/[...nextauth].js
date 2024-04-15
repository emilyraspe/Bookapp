import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../db/db";

// Define MongoDB adapter instance
const mongoDBAdapter = MongoDBAdapter(clientPromise);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: mongoDBAdapter, // Pass MongoDB adapter here
});

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
        };
      },
    }),
  ],
  adapter: mongoDBAdapter, // Also pass MongoDB adapter here
  callbacks: {
    async session({ session, user }) {
      // The user object from the database contains the ID of the user in your database

      session.user.userId = user.id;

      // With the code above you can add the user ID to the session object and use it in your pages
      // Make sure you console.log the session and user objects to see what they contain

      return session;
    },
  },
};

export default NextAuth(authOptions);
