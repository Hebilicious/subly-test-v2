import React, { useState } from "react"
import { Dashboard } from "./components/Dashboard"
import { FileList } from "./components/FileList"
import { UserList } from "./components/UserList"

interface AppProps {}

function App({}: AppProps) {
    const [activeComponent, setActiveComponent] = useState("dashboard")
    return (
        <div className="App">
            <div className="Navigation">
                <button onClick={() => setActiveComponent("userList")}>Users</button>
                <button onClick={() => setActiveComponent("fileList")}>Files</button>
                <button onClick={() => setActiveComponent("dashboard")}>Dashboard</button>
            </div>
            <div className="Content">
                {(() => {
                    switch (activeComponent) {
                        case "userList":
                            return <UserList />
                        case "fileList":
                            return <FileList />
                        case "dashboard":
                            return <Dashboard />
                        default:
                            return <div>Nothing</div>
                    }
                })()}
            </div>
        </div>
    )
}

export default App
