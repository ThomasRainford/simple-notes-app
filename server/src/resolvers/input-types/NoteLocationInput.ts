import { Field, InputType } from "type-graphql";


@InputType()
export class NoteLocationInput {

   @Field()
   listId: string

   @Field()
   noteId: string

}