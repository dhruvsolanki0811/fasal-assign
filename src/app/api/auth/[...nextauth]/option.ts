import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import initDB from "@/utils/db";
import bcryptjs from "bcryptjs";
import User from "@/models/User";

initDB();

export const options: NextAuthOptions = {
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in with Email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;
        // login
        const { email, password } = credentials;
        const user = await User.findOne({ email :email});
        
        if (!user) {
          return null
        }
        const isMatch = await bcryptjs.compare(password,user.password);
        if (!isMatch) {
          // throw new Error("Invalid credentials");
          return null
        }
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
