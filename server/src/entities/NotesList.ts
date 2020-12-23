import { Entity, ManyToOne, PrimaryKey, Property, SerializedPrimaryKey } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { Field, ID, ObjectType } from "type-graphql";
import { Note } from "../resolvers/object-types/Note";
import { User } from "./User";

@ObjectType() // type-graphql
@Entity()     // orm
export class NotesList {

   @Field(() => ID)
   @PrimaryKey()
   _id: ObjectId

   @Field()
   @SerializedPrimaryKey()
   id: string

   @ManyToOne()
   user: User

   @Field(() => [Note])
   @Property()
   notes: Note[]

   @Field(() => Date)
   @Property()
   createdAt = new Date()

   @Field(() => Date)
   @Property({ onUpdate: () => new Date() })
   updatedAt = new Date()

   constructor(notes: Note[]) {
      this.notes = notes
   }

}