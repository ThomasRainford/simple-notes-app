import { MikroORM } from "@mikro-orm/core"
import { MongoHighlighter } from "@mikro-orm/mongo-highlighter"
import { NotesList } from "./entities/NotesList"
import { User } from "./entities/User"

export default {
   entities: [User, NotesList],
   dbName: 'simple-notes-app-db',
   type: 'mongo',
   clientUrl: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`,
   highlighter: new MongoHighlighter(),
} as Parameters<typeof MikroORM.init>[0]