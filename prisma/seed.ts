import { PrismaClient } from '../src/generated/prisma'
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

async function main() {

    const email = 'mail@mail.com';
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = await prisma.user.upsert({
        where: { email: email },
        update: {},
        create: {
            email: email,
            password: hashedPassword,
        },
    })

    console.log({ adminUser })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })