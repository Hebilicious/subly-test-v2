import * as React from "react"
import { render } from "@testing-library/react"
import App from "../App"

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache()
})

test("renders user button", () => {
    const { getByText } = render(
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    )
    const userButton = getByText(/Users/i)

    expect(userButton).toBeInTheDocument()
})

test("renders file button", () => {
    const { getByText } = render(
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    )
    const fileButton = getByText(/Files/i)

    expect(fileButton).toBeInTheDocument()
})

test("renders dashboard button", () => {
    const { getByText } = render(
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    )

    const dashboardButton = getByText(/Dashboard/i)

    expect(dashboardButton).toBeInTheDocument()
})
