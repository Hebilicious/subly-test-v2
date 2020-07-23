import React from "react"
import { gql, useQuery } from "@apollo/client"

const GET_FILES = gql`
    query getFiles {
        files {
            name
            type
            uuid
            duration
            size
            createdAt
            owner {
                id
                name
            }
        }
    }
`

export const FileList = () => {
    const { loading, error, data } = useQuery(GET_FILES)

    if (loading) return <div className="Loading">Loading ...</div>

    if (error) return <div>{"An error has occurred: " + error.message}</div>

    return (
        <div>
            {data?.files.map((files: any) => {
                const { name = "", type = "", uuid = "", duration = "", size = "", createdAt = "", owner = {} } = files
                return (
                    <div key={uuid} style={{ border: "1px solid white", margin: "1rem" }}>
                        <div>
                            Name : {name}.{type}
                        </div>
                        <div>uuid : {uuid} </div>
                        <div>Duration : {duration} ms</div>
                        <div>Size : {size} ms</div>
                        <div>Owner : {JSON.stringify(owner)} </div>
                        <div>Date : {createdAt} </div>
                    </div>
                )
            })}
        </div>
    )
}
