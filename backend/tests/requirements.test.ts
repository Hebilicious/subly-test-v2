// import request from "supertest"
import { ApolloServerTestClient, createTestClient } from "apollo-server-testing"
import { createContext, prisma } from "../src/context"
import { testSchema } from "../src/schema"

import { ApolloServer, gql } from "apollo-server"

afterAll(async (done) => {
    await prisma.disconnect()
    done()
})

let Client: ApolloServerTestClient

beforeAll(() => {
    const server = new ApolloServer({ schema: testSchema, context: createContext })
    Client = createTestClient(server)
})

describe("Report tests", () => {
    test("Can query overall total files, average file size and duration", async () => {
        const { query } = Client
        const { data } = await query({
            query: gql`
                query {
                    report {
                        totalFiles
                        averageFileSize
                        averageFileDuration
                    }
                }
            `
        })
        if (!data) throw new Error("No data")
        expect(data).toHaveProperty("report.totalFiles")
        expect(data).toHaveProperty("report.averageFileSize")
        expect(data).toHaveProperty("report.averageFileDuration")
    })

    test("Can query file type informations", async () => {
        //Look at prisma.schema to know allowed types
        const { query } = Client
        const { data } = await query({
            query: gql`
                query reportFileType {
                    reportFileType(type: WAV) {
                        fileType
                        totalFiles
                        quantity
                    }
                }
            `
        })
        if (!data) throw new Error("No data")
        expect(data).toHaveProperty("reportFileType.fileType")
        expect(data).toHaveProperty("reportFileType.quantity")
        expect(data).toHaveProperty("reportFileType.totalFiles")
    })
})

describe("User tests", () => {
    test("Can query how many files a user has", async () => {
        const { query } = Client
        const users = await prisma.user.findMany({ take: 1 })
        const { id } = users[0]
        const { data } = await query({
            query: gql`
                query user($id: Int!) {
                    user(where: { id: $id }) {
                        totalFiles
                        name
                    }
                }
            `,
            variables: { id }
        })
        if (!data) throw new Error("No data")
        expect(data).toHaveProperty("user.name")
        expect(data).toHaveProperty("user.totalFiles")
    })

    test("Can query average duration of a user files", async () => {
        const { query } = Client
        const users = await prisma.user.findMany({ take: 1 })
        const { id } = users[0]
        const { data } = await query({
            query: gql`
                query averageFileDuration($id: Int!) {
                    user(where: { id: $id }) {
                        averageFileDuration
                    }
                }
            `,
            variables: { id }
        })
        if (!data) throw new Error("No data")
        expect(data).toHaveProperty("user.averageFileDuration")
    })

    test("Can query average file size of a user files", async () => {
        const { query } = Client
        const users = await prisma.user.findMany({ take: 1 })
        const { id } = users[0]
        const { data } = await query({
            query: gql`
                query averageFileSize($id: Int!) {
                    user(where: { id: $id }) {
                        averageFileSize
                    }
                }
            `,
            variables: { id }
        })
        if (!data) throw new Error("No data")
        expect(data).toHaveProperty("user.averageFileSize")
    })
})

describe("CRUD tests", () => {
    test("Can list users", async () => {
        const { query } = Client
        const { data } = await query({
            query: gql`
                query users {
                    users {
                        id
                    }
                }
            `
        })
        if (!data) throw new Error("No data")
        expect(data.users.length > 0).toBe(true)
    })

    test("Can list files", async () => {
        const { query } = Client
        const { data } = await query({
            query: gql`
                query files {
                    files {
                        id
                    }
                }
            `
        })
        if (!data) throw new Error("No data")
        expect(data.files.length > 0).toBe(true)
    })
})
