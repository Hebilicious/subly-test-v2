import React from "react"
import { gql, useQuery } from "@apollo/client"

import type { DocumentNode } from "graphql"

const GET_REPORT = gql`
    query report {
        report {
            totalFiles
            averageFileSize
            averageFileDuration
        }
    }
`

const GET_REPORT_WAV = gql`
    query reportFileType {
        reportFileType(type: WAV) {
            fileType
            quantity
        }
    }
`
const GET_REPORT_MP4 = gql`
    query reportFileType {
        reportFileType(type: MP4) {
            fileType
            quantity
        }
    }
`
const ReportPanel = () => {
    const { loading, error, data } = useQuery(GET_REPORT)
    if (loading) return <div className="Loading">Loading ...</div>

    if (error) return <div>{"An error has occurred: " + error.message}</div>
    return (
        <div>
            <div>Total Files : {data?.report?.totalFiles} </div>
            <div>Average File Size : {data?.report?.averageFileSize} </div>
            <div>Average File Duration : {data?.report?.averageFileDuration} </div>
        </div>
    )
}

interface FileTypePanelProps {
    type: string
    query: DocumentNode
}

const ReportFileTypePanel = ({ type, query }: FileTypePanelProps) => {
    const { loading, error, data } = useQuery(query)
    if (loading) return <div className="Loading">Loading ...</div>

    if (error) return <div>{"An error has occurred: " + error.message}</div>
    return (
        <div>
            <div> {type} </div>
            <div> Amount : {data?.reportFileType?.quantity} </div>
        </div>
    )
}

export const Dashboard = () => {
    return (
        <div>
            <ReportPanel />
            <ReportFileTypePanel type="WAV" query={GET_REPORT_WAV} />
            <ReportFileTypePanel type="MP4" query={GET_REPORT_MP4} />
        </div>
    )
}
