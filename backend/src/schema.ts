import { makeSchema, objectType, queryType, arg } from "@nexus/schema"
import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema"
import * as path from "path"

import * as User from "./schema/User"
import * as Query from "./schema/Query"

const File = objectType({
    name: "File",
    definition(t) {
        t.model.id()
        t.model.name()
        t.model.uuid()
        t.model.type()
        t.model.size()
        t.model.duration()
        t.model.owner()
    }
})

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
