import { makeSchema } from "@nexus/schema"
import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema"
import * as path from "path"

import * as User from "./schema/User"
import * as Query from "./schema/Query"
import * as File from "./schema/File"

const types = [User, File, Query]

export const schema = makeSchema({
    types,
    plugins: [
        nexusSchemaPrisma({
            experimentalCRUD: true
        })
    ],
    outputs: {
        schema: path.join(__dirname, "../schema.graphql"),
        typegen: path.join(__dirname, "../../node_modules/@types/nexus-typegen/index.d.ts")
    },
    typegenAutoConfig: {
        contextType: "Context.Context",
        sources: [
            {
                source: ".prisma/client",
                alias: "prisma"
            },
            {
                source: require.resolve("./context"),
                alias: "Context"
            }
        ]
    }
})

export const testSchema = makeSchema({
    types,
    plugins: [
        nexusSchemaPrisma({
            experimentalCRUD: true
        })
    ]
})
