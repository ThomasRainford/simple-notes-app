import { cacheExchange, Client, dedupExchange, fetchExchange } from "urql"

export const createUrqlClient = (ssrExchange: any) => {

   return {
      url: 'http://localhost:3000/graphql',
      exchanges: [
         dedupExchange,
         cacheExchange,
         ssrExchange,
         fetchExchange
      ],
      fetchOptions: {
         credentials: 'include' as const
      }
   }
}