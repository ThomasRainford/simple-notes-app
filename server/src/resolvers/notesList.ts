import { NotesList } from "../entities/NotesList";
import { OrmContext } from "../types/types";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Note } from "../entities/Note";
import { NoteInput } from "./input-types/NoteInput";
import { isAuth } from "../middleware/isAuth";

@Resolver(NotesList)
export class NotesListResolver {

   @Mutation(() => NotesList)
   @UseMiddleware(isAuth)
   async createList(
      @Ctx() { em }: OrmContext
   ): Promise<NotesList> {

      const notesList = new NotesList()

      await em.persistAndFlush(notesList)

      return notesList
   }


   @Mutation(() => Note)
   @UseMiddleware(isAuth)
   async addNote(
      @Arg('listId') listId: string,
      @Arg('noteInput') noteInput: NoteInput,
      @Ctx() { em }: OrmContext
   ): Promise<Note> {

      const repo = em.getRepository(NotesList)
      const list = await repo.findOne({ id: listId })

      const note = new Note(noteInput)
      list?.notes.push(note)

      await em.persistAndFlush(note)

      return note
   }

}