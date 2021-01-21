import { useRouter } from "next/router"
import { useEffect } from "react"
import { UseQueryState } from "urql"
import { GetAllNotesListsQuery } from "../generated/graphql"

export const useIsAuth = (result: UseQueryState<GetAllNotesListsQuery, object>) => {

   const router = useRouter()

   useEffect(() => {
      // Check if user is logged.
      if (result.error?.message.includes('not authenticated')) {
         router.replace('/account/login')
      }
   }, [result, router])
}