import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function reset() {
    await prisma.file.deleteMany({ where: {} })
    await prisma.user.deleteMany({ where: {} })
}

reset()
    .then(() => console.log("Deleted all entries ..."))
    .catch(console.error)
    .finally(async () => {
        await prisma.disconnect()
    })
