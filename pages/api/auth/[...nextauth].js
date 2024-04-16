import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../db/db";

const mongoDBAdapter = MongoDBAdapter(clientPromise);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: mongoDBAdapter,
});

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile(profile) {
        console.log(profile);
        return {
          id: profile.sub,
          name: profile.name,
          image: profile.picture,
          email: profile.email,
          bookshelves: [],
        };
      },
    }),
  ],
  adapter: mongoDBAdapter,
  callbacks: {
    async session({ session, user }) {
      session.user.userId = user.id;

      return session;
    },
  },
};

export default NextAuth(authOptions);
