import UserModel from "@/models/UserModel";
import dbConnect from "@/utils/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { mobile, otp } = credentials;

        try {
          await dbConnect();
          const user = await UserModel.findOne({ mobile, lastOTP: otp });
          console.log("🚀 ~ authorize ~ user:", user);
          
          if (!user) {
            return null;
          }
          
          user.isMobileVerified = true;
          await user.save()

          if (user.isMobileVerified && user.firstName) {
            console.log("already user");
            return user;
          }

          console.log("new user");
          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user._id;
        token.name = user.firstName;
        token.image = user.imageURL;
      }
      if (trigger === "update" && session?.name) {
        token.name = session.name
      }
      return token; 
    },
    async session({ session, token }) {
      if (token) {
        session.user = {id: token.id, name: token.name, image: token.image};
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
