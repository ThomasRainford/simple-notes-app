import { Field, InputType } from "type-graphql";

@InputType()
export class NoteUpdateInput {

   @Field()
   title: string

   @Field()
   text: string

}