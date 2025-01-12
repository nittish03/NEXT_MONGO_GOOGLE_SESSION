
import CredentialsProvider from "next-auth/providers/credentials";
import connectDb from "@/mongoDb/connectDb";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import bcryptjs from "bcryptjs";
import User from '@/models/userModel'
export const AuthOptions: NextAuthOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),    CredentialsProvider({
          name: "credentials",
          credentials: {
              email: { label: "Email", type: "text" },
              password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
              if (!credentials?.email || !credentials?.password) {
                  return null;
              }
              await connectDb();
              const user = await User.findOne({ email: credentials?.email});
              if (!user) {
                  return null;
              }
              const passwordMatch = await bcryptjs.compare(credentials.password,user.password);
    
              if (!passwordMatch) {
                  return null
              }
    
              return user
          }
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
    
        if (user) {
          token.id = user.id;
          // token.role = user.role; // Assuming user has a role field
        }
        return token
      },
      async session({ session, token }) {
    if(token && session.user){
            // // Add extra fields to the session object
            // session.user.id = token.id;
            // session.user.role = token.role;
            // session.user.some = "something"
    }
        return session
      }
    },
      session: {
        strategy: "jwt",
      },
      jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
      },
      secret: process.env.NEXTAUTH_SECRET,
      debug: process.env.NODE_ENV === "development",
}

