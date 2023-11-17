import { useQuery } from '@tanstack/react-query'
import { Issue } from '../interfaces/issue'
import { githubApi } from '../../api/githubApi'


export default function useIssue(issueNumber: number) {
    
    const issueQuery = useQuery({
        queryKey:["issue", issueNumber],
        queryFn: () => getIssueInfo(issueNumber),
    })

    const commentsQuery = useQuery({
        queryKey:["comments", issueNumber],
        queryFn: () => getIssueComments(issueQuery.data!.number),
        enabled: issueQuery.data !== undefined
    })
    
    return {
        issueQuery,
        commentsQuery
    }
}

const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
    const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`)
    return data
}

const getIssueComments = async (issueNumber: number): Promise<Issue[]> => {
    const { data } = await githubApi.get<Issue[]>(`/issues/${issueNumber}/comments`)
    return data
}