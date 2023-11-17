import { useQuery } from "@tanstack/react-query"
import { githubApi } from "../../api/githubApi"
import { Issue } from "../interfaces/issue"

const getIssuesList = async (): Promise<Issue[]> => {
    const { data } = await githubApi.get<Issue[]>("/issues")
    return data
}

export default function useIssuesList() {

  const issuesQuery = useQuery({
    queryKey: ["issues"],
    queryFn: getIssuesList
  })

  return {
    issuesQuery
  }
}