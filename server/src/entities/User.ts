import { Collection, Entity, OneToMany, PrimaryKey, Property, SerializedPrimaryKey } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { Field, ID, ObjectType } from "type-graphql";
import { UserRegisterInput } from "../resolvers/input-types/UserRegisterInput";
import { NotesList } from "./NotesList";

@ObjectType() // type-graphql
@Entity()     // orm
export class User {

   @Field(() => ID)
   @PrimaryKey()
   _id: ObjectId

   @Field()
   @SerializedPrimaryKey()
   id: string

   @Field()
   @Property({ type: 'text', unique: true })
   email!: string

   @Field()
   @Property({ type: 'text', unique: true })
   username!: string

   @Property()
   password!: string

   @Field(() => [NotesList])
   @OneToMany(() => NotesList, nl => nl.user)
   lists = new Collection<NotesList>(this)

   @Field(() => Date)
   @Property()
   createdAt = new Date()

   @Field(() => Date)
   @Property({ onUpdate: () => new Date() })
   updatedAt = new Date()

   constructor({ email, username, password }: UserRegisterInput) {
      this.email = email
      this.username = username
      this.password = password
   }

}