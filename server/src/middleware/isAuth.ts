import { MiddlewareFn } from "type-graphql"
import { OrmContext } from "../types/types"

export const isAuth: MiddlewareFn<OrmContext> = ({ context }, next) => {
   console.log('isAuth: ', context.req.session.userId)
   if (!context.req.session.userId) {
      throw new Error("not authenticated")
   }

   return next()
};