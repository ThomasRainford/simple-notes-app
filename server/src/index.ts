import { MikroORM } from '@mikro-orm/core'
import { ApolloServer } from "apollo-server-express"
//import cors from 'cors'
import 'dotenv-safe/config'
import express from "express"
import session from 'express-session'
import 'reflect-metadata'
import { buildSchema } from "type-graphql"
import { COOKIE_NAME, __prod__ } from './constants'
import ormConfig from './mikro-orm.config'
import { NotesListResolver } from './resolvers/notesList'
import { UserResolver } from "./resolvers/user"
import { OrmContext } from './types/types'
import MongoDBStore from 'connect-mongodb-session'
const MongoStore = MongoDBStore(session)

const main = async () => {

   const orm = await MikroORM.init(ormConfig)

   const app = express()

   app.set('proxy', 1)

   // app.use(
   //    cors({
   //       origin: process.env.CORS_ORIGIN,
   //       credentials: true,
   //    })
   // )

   app.use(
      session({
         name: COOKIE_NAME,
         store: new MongoStore({
            uri: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`,
            databaseName: 'simple-notes-app-db',
            collection: 'sessions',
         }),
         cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
            httpOnly: true,
            sameSite: 'lax', // csrf
            secure: __prod__, // cookie only works in https
         },
         saveUninitialized: false,
         secret: process.env.SESSION_SECRET,
         resave: false,
      })
   )

   const apolloServer = new ApolloServer({
      schema: await buildSchema({
         resolvers: [UserResolver, NotesListResolver],
         validate: false
      }),
      context: ({ req, res }: never): OrmContext => ({
         em: orm.em,
         req,
         res,
         //redis,
      }),
   })

   apolloServer.applyMiddleware({
      app,
      cors: {
         origin: process.env.CORS_ORIGIN,
         credentials: true
      }
   })

   const port = process.env.PORT || 3000
   app.listen(port, () => {
      console.log(`Server started on port ${port}.`)
      console.log(`Visit 'http://localhost:${port}/graphql' to access GraphQL Playgorund.`)
   })

}

try {
   main()
} catch (error) {
   console.log(error)
}