import { NoteInput } from "../input-types/NoteInput";
import { Field, ID, ObjectType } from "type-graphql";
import { v4 as uuidv4 } from 'uuid'

@ObjectType() // type-graphql
export class Note {

   @Field(() => ID)
   id = uuidv4()

   @Field()
   title: string

   @Field()
   text: string

   @Field(() => Date)
   createdAt = new Date()

   @Field(() => Date)
   updatedAt = new Date()

   constructor({ text, title }: NoteInput) {
      this.title = title
      this.text = text
   }

}