import { PrismaClient } from "@prisma/client"
import * as faker from "faker"

const prisma = new PrismaClient()

async function seed() {
    const users = await prisma.user.findMany()
    // const files = await prisma.file.findMany()
    if (users.length > 5) {
        console.log("Already seeded...")
        return
    }

    const usersToCreate = makeUserWithFiles()
    console.log("Creatings users with files ...")
    await Promise.all(usersToCreate)
}

const makeUserWithFiles = ({ u = 10, f = 10 } = {}) => {
    return Array.from({ length: u }).map((_) => {
        return prisma.user.create({
            data: {
                name: faker.name.findName(),
                country: faker.address.countryCode(),
                files: {
                    create: Array.from({ length: f }).map((n) => ({
                        name: faker.system.fileName().split(".")[0],
                        uuid: faker.random.uuid(),
                        duration: faker.random.number(),
                        size: faker.random.number(),
                        type: Math.random() < 0.5 ? "MP4" : "WAV"
                    }))
                }
            }
        })
    })
}
seed()
    .then(() => console.log("seeded!"))
    .catch(console.error)
    .finally(async () => {
        await prisma.disconnect()
    })
