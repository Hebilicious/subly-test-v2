import { arg, queryType, objectType } from "@nexus/schema"

//We'll use this object type to return our reports
export const Report = objectType({
    name: "Report",
    definition(t) {
        t.int("totalFiles")
        t.float("averageFileDuration")
        t.float("averageFileSize")
    }
})

//We'll make a custom query for the file types
export const FileTypeReport = objectType({
    name: "FileTypeReport",
    definition(t) {
        t.field("fileType", { type: "FileType" })
        t.int("quantity")
        t.int("totalFiles")
    }
})

export const Query = queryType({
    definition(t) {
        //Expose CRUD operations from prisma
        t.crud.file()
        t.crud.files({ filtering: true, pagination: true })
        t.crud.user()
        t.crud.users({ filtering: true, pagination: true })

        //Implement file type report
        t.field("reportFileType", {
            type: "FileTypeReport",
            args: {
                type: arg({ type: "FileType", required: true })
            },
            resolve: async (root, { type }, ctx) => {
                const totalFiles = await ctx.prisma.file.count()
                const files = await ctx.prisma.file.findMany({
                    where: { type }
                })
                return { fileType: type, quantity: files.length, totalFiles }
            }
        })

        //Implement general report
        t.field("report", {
            type: "Report",
            resolve: async (root, args, ctx) => {
                const totalFiles = await ctx.prisma.file.count()
                const sizeResult = await ctx.prisma.queryRaw(`select AVG(size) from "public"."File"`)
                const durationResult = await ctx.prisma.queryRaw(`select AVG(duration) from "public"."File"`)
                const { avg: averageFileSize } = sizeResult[0]
                const { avg: averageFileDuration } = durationResult[0]
                return { totalFiles, averageFileSize, averageFileDuration }
            }
        })
        // Use existing prisma input type : args: {
        //         user: arg({ type: "UserWhereUniqueInput", required: true })
        //     }
    }
})
