import React from "react"
import { gql, useQuery } from "@apollo/client"

const GET_USERS = gql`
    query getUsers {
        users {
            id
            name
            country
            createdAt
        }
    }
`

export const UserList = () => {
    const { loading, error, data } = useQuery(GET_USERS)

    if (loading) return <div className="Loading">Loading ...</div>

    if (error) return <div>{"An error has occurred: " + error.message}</div>

    return (
        <div>
            {data?.users.map(({ id = "", name = "", country = "", createdAt = "" }) => (
                <div key={id} style={{ border: "1px solid white", margin: "1rem" }}>
                    <div>Name : {name} </div>
                    <div>Country : {country} </div>
                    <div>ID : {id} </div>
                    <div>Date : {createdAt} </div>
                </div>
            ))}
        </div>
    )
}
