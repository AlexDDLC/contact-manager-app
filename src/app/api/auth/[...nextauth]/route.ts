import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/libs/prisma'

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email@mail.com" },
                password: { label: "Contraseña", type: "password", placeholder: "*************" }
            },
            async authorize(credentials, request) {
                console.log(credentials)

                const userFound = await prisma.user.findUnique({
                    where: { email: credentials?.email }
                })

                console.log(userFound);

                return null;
            }
        })
    ]
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }