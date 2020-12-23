import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { NoteInput } from "../resolvers/input-types/NoteInput";
import { Field, ID, ObjectType } from "type-graphql";
import { NotesList } from "./NotesList";

@ObjectType() // type-graphql
@Entity()     // orm
export class Note {

   @Field(() => ID)
   @PrimaryKey()
   _id: ObjectId

   @Field()
   @Property()
   title: string

   @Field()
   @Property()
   text: string

   @ManyToOne()
   noteList: NotesList

   @Field(() => Date)
   @Property()
   createdAt = new Date()

   @Field(() => Date)
   @Property({ onUpdate: () => new Date() })
   updatedAt = new Date()

   constructor({ text, title }: NoteInput) {
      this.title = title
      this.text = text
   }

}