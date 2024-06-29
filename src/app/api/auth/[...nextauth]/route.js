import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth/next"
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from 'bcryptjs'

const authOptions = {
   providers: [
      CredentialsProvider({
         name: 'credentials',
         credentials: {},
         async authorize(credentials, req) {
            const { email, password } = credentials;

            try {
               await connectMongoDB(process.env.MONGODB_URI);
               const user = await User.findOne({ email });

               if (!user) {
                  throw new Error("No user found with the provided email.");
               }

               const passwordMatch = await bcrypt.compare(password, user.password);

               if (!passwordMatch) {
                  throw new Error("Invalid password.");
               }

               return user;
            } catch (error) {
               console.error("Error in authorization:", error);
               return null;
            }
         }
      })
   ],
   session: {
      strategy: "jwt"
   },
   secret: process.env.NEXTAUTH_SECRET,
   pages: {
      signIn: "/login"
   },
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token.id = user.id;
            token.role = user.role;
         }
         return token;
      },
      async session({ session, token }) {
         session.user.id = token.id;
         session.user.role = token.role;
         return session;
      }
   }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

