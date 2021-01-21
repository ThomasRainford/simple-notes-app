import { Client, dedupExchange, fetchExchange } from "urql"
import { cacheExchange, Resolver, Cache } from "@urql/exchange-graphcache";
import { MeQueryVariables } from "../generated/graphql";

export const createUrqlClient = (ssrExchange: any) => {

   return {
      url: 'http://localhost:3000/graphql',
      exchanges: [
         dedupExchange,
         cacheExchange({
            updates: {
               Mutation: {
                  logout: (result, args, cache, info) => {
                     console.log(args)
                  },
               }
            }
         }),
         ssrExchange,
         fetchExchange
      ],
      fetchOptions: {
         credentials: 'include' as const
      }
   }
}