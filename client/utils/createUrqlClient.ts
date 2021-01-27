import { Client, dedupExchange, fetchExchange } from "urql"
import { cacheExchange, Resolver, Cache } from "@urql/exchange-graphcache";

const invalidateAllLists = (cache: Cache) => {
   const allFields = cache.inspectFields('Query')
   const fieldInfos = allFields.filter((info) => info.fieldName === 'getAllNotesLists')
   fieldInfos.forEach((fi) => {
      cache.invalidate('Query', 'getAllNotesLists', fi.arguments || null)
   })
}

export const createUrqlClient = (ssrExchange: any) => {

   return {
      url: 'http://localhost:3000/graphql',
      exchanges: [
         dedupExchange,
         cacheExchange({
            updates: {
               Mutation: {
                  logout: (result, args, cache, info) => {

                  },
                  login: (result, args, cache, info) => {
                     invalidateAllLists(cache)
                  },
                  createList: (result, args, cache, info) => {
                     invalidateAllLists(cache)
                  },
                  addNote: (result, args, cache, info) => {
                     invalidateAllLists(cache)
                  },
                  deleteNote: (result, args, cache, info) => {
                     invalidateAllLists(cache)
                  }
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