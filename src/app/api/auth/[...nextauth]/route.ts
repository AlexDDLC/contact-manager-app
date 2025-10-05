import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email@mail.com" },
                password: { label: "Contraseña", type: "password", placeholder: "*************" }
            },
            async authorize(credentials, request) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const userExists = await prisma.user.findUnique({
                    where: { email: credentials?.email }
                })

                if (!userExists) throw new Error('Usuario o Contraseña incorrecto')

                const passwordMatch = await bcrypt.compare(
                    credentials.password,
                    userExists.password
                )

                if (!passwordMatch) throw new Error('Usuario o Contraseña incorrecto')

                return {
                    id: userExists.id.toString(),
                    email: userExists.email
                }
            }
        })
    ]
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }