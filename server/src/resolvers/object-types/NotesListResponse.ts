import { NotesList } from "../../entities/NotesList";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
class Error {

   @Field()
   property: string

   @Field()
   message: string

}

@ObjectType()
export class NotesListResponse {

   @Field(() => NotesList, { nullable: true })
   notesList?: NotesList

   @Field(() => [Error], { nullable: true })
   errors: Error[]

}