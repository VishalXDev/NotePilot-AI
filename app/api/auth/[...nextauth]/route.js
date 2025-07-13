// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/lib/db";
import { User } from "@/lib/models";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();
        console.log("📥 Login attempt:", credentials.email);

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          console.log("❌ User not found");
          throw new Error("No user found");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        console.log("🔐 Password match:", isValid);

        if (!isValid) {
          console.log("❌ Invalid password");
          throw new Error("Invalid password");
        }

        console.log("✅ User authenticated:", user.email);
        return { id: user._id, name: user.name, email: user.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) session.user.id = token.sub;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };