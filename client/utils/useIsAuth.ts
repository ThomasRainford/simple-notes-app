import { useRouter } from "next/dist/client/router"
import { useEffect } from "react"
import { useMeQuery } from "../generated/graphql"

export const useIsAuth = () => {

   const [{ data, fetching }] = useMeQuery()
   const router = useRouter()

   useEffect(() => {

      if (!fetching && !data?.me) {
         router.replace('/account/login')
      }

   }, [fetching, data, router])

}