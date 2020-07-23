import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./index.css"

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache()
})

export const Main = () => (
    <ApolloProvider client={client}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ApolloProvider>
)

ReactDOM.render(<Main />, document.getElementById("root"))

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
    import.meta.hot.accept()
}
