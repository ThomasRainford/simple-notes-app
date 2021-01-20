import { useRouter } from "next/router"
import { useEffect } from "react"
import { useMeQuery } from "../generated/graphql"

export const useIsAuth = () => {

   const [{ data, fetching }, me] = useMeQuery()
   const router = useRouter()

   console.log('useIsAuth:')
   useEffect(() => {
      // Check if logged in when page loads
      if (!fetching && !data?.me) {
         console.log('No User')
         router.replace('/account/login')

      } else {
         console.log('User: ', data)
      }
   }, [fetching, data, router])
}