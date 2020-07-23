import { objectType } from "@nexus/schema"

export const User = objectType({
    name: "User",
    definition(t) {
        //Those fields are exposed and typed from prisma directly
        t.model.id()
        t.model.name()
        t.model.country()
        t.model.createdAt()
        t.model.files({ type: "File" })
        //Custom fields
        //Total number of files
        t.int("totalFiles", {
            nullable: true,
            resolve: async ({ id }, args, ctx) => {
                const files = await ctx.prisma.file.findMany({
                    where: { ownerId: id }
                })
                return files.length
            }
        })
        //Average file size
        t.float("averageFileSize", {
            nullable: true,
            resolve: async ({ id }, args, ctx) => {
                const files = await ctx.prisma.file.findMany({
                    where: { ownerId: id }
                })
                const totalFileSize = files.reduce((acc, { size }) => acc + Number(size), 0)
                return totalFileSize / files.length
            }
        })
        //Average file duration
        t.float("averageFileDuration", {
            nullable: true,
            resolve: async ({ id }, args, ctx) => {
                const files = await ctx.prisma.file.findMany({
                    where: { ownerId: id }
                })
                const totalFileDuration = files.reduce((acc, { duration }) => acc + Number(duration), 0)
                return totalFileDuration / files.length
            }
        })
    }
})
