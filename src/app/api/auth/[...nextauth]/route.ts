import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/libs/prisma";
import bcrypt from 'bcrypt';


 const handler = NextAuth({
    providers: [
        /*
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        */
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const userFound = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email,
                    },
                });

                if (!userFound) throw new Error('No user found');

                const matchPassword = await bcrypt.compare(credentials!!.password, userFound.password);

                if (!matchPassword) throw new Error('Wrong password');

                const { password, ...userClient } = userFound;

                // Devolver el objeto sin el campoNoDeseado
                return {
                    id: userFound.id_user,
                    email: userFound.email,
                    name: userFound.name,
                    rol: userFound.role
                };

            },

        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token as any;
            return session;
        },
    },

    pages: {
        signIn: '/',
    },
});

//export const  authOptions = handler

export { handler as GET, handler as POST };













/*
callbacks: {
    async session({ session, token }) {
        // Usa el mismo formato de datos que la función authorize
        session.user = {
            id: token.id,
            name: token.name,
            email: token.email,
            rol: token.rol,
            token: token.token,
        };
        return session;
    },
    async jwt({ user, account, profile, token }) {

        if (account?.provider === "credentials" && profile?.email) {
            const userEmail = profile.email;

            const response = await fetch("http://localhost:8000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: userEmail }),
            });

            if (response.ok) {
                const data = await response.json();
                token.token = data.access_token
                token.id = data.id_user

            }
        }

        return token;
    },
},
*/