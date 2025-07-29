// app/api/auth/[...nextauth]/auth-options.ts
import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
  session({ session, user }) {
    return {
      ...session,
      user: {
        ...session.user,
        id: user.id, 
      },
    };
  },
},

};