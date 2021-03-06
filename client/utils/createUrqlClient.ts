import { Cache, cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";

const invalidateAllLists = (cache: Cache) => {
   const allFields = cache.inspectFields('Query')
   const fieldInfos = allFields.filter((info) => info.fieldName === 'getAllNotesLists')
   fieldInfos.forEach((fi) => {
      cache.invalidate('Query', 'getAllNotesLists', fi.arguments || null)
   })
}

const invalidateMeQuery = (cache: Cache) => {
   const allFields = cache.inspectFields('Query')
   const fieldInfos = allFields.filter((info) => info.fieldName === 'me')
   fieldInfos.forEach((fi) => {
      cache.invalidate('Query', 'me', fi.arguments || null)
   })
}

export const createUrqlClient = (ssrExchange: any) => {
   const url = /*'http://localhost:3000/graphql'*/ 'https://evening-scrubland-26587.herokuapp.com/graphql'
   return {
      url,
      exchanges: [
         dedupExchange,
         cacheExchange({
            updates: {
               Mutation: {
                  logout: (result, args, cache, info) => {

                  },
                  login: (result, args, cache, info) => {
                     invalidateAllLists(cache)
                     invalidateMeQuery(cache)
                  },
                  register: (result, args, cache, info) => {
                     invalidateAllLists(cache)
                     invalidateMeQuery(cache)
                  },
                  createList: (result, args, cache, info) => {
                     invalidateAllLists(cache)
                  },
                  addNote: (result, args, cache, info) => {
                     invalidateAllLists(cache)
                  },
                  deleteNote: (result, args, cache, info) => {
                     invalidateAllLists(cache)
                  },
                  deleteNotesList: (result, args, cache, info) => {
                     invalidateAllLists(cache)
                  },
                  updateNotesList: (result, args, cache, info) => {
                     invalidateAllLists(cache)
                  },
               }
            },
            keys: {
               NoteResponse: () => null
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