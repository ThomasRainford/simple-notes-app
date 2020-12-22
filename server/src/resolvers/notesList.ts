import { NotesList } from "src/entities/NotesList";
import { OrmContext } from "src/types/types";
import { Ctx, Mutation, Resolver } from "type-graphql";


@Resolver(NotesList)
class NotesListResolver {

   @Mutation()
   createList(
      @Ctx() { em, req }: OrmContext
   ) {

      const repo = em.getRepository(NotesList)

   }

}