import { useRouter } from "next/dist/client/router"
import { useMeQuery } from "../generated/graphql"

export const useIsAuth = (): boolean => {

   const [{ data, fetching, error }] = useMeQuery()
   const router = useRouter()

   console.log(error?.message, data)

   if (!data?.me) {
      return false
   }

   return true

}