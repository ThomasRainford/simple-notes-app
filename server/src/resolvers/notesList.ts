import { NotesList } from "../entities/NotesList";
import { OrmContext } from "../types/types";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Note } from "./object-types/Note";
import { NoteInput } from "./input-types/NoteInput";
import { isAuth } from "../middleware/isAuth";
import { NoteLocationInput } from "./input-types/NoteLocationInput";
import { NoteUpdateInput } from "./input-types/NoteUpdateInput";

@Resolver(NotesList)
export class NotesListResolver {

   @Query(() => NotesList, { nullable: true })
   @UseMiddleware(isAuth)
   async getNotesList(
      @Arg('listId') listId: string,
      @Ctx() { em }: OrmContext,
   ): Promise<NotesList | null> {

      const repo = em.getRepository(NotesList)
      const list = await repo.findOne({ id: listId })

      if (!list) {
         return null
      }

      return list
   }


   @Query(() => Note, { nullable: true })
   @UseMiddleware(isAuth)
   async getNote(
      @Arg('noteLocation') noteLocation: NoteLocationInput,
      @Ctx() { em }: OrmContext,
   ): Promise<Note | null> {

      const repo = em.getRepository(NotesList)

      const list = await repo.findOne({ id: noteLocation.listId })
      const note = list?.notes.find(note => note.id === noteLocation.noteId)

      if (!list || !note) {
         return null
      }

      return note
   }

   @Mutation(() => NotesList)
   @UseMiddleware(isAuth)
   async createList(
      @Ctx() { em, req }: OrmContext,
   ): Promise<NotesList> {

      const notesList = new NotesList([], req.session['userId']?.toString())

      await em.persistAndFlush(notesList)

      return notesList
   }

   @Mutation(() => NotesList, { nullable: true })
   @UseMiddleware(isAuth)
   async addNote(
      @Arg('listId') listId: string,
      @Arg('noteInput') noteInput: NoteInput,
      @Ctx() { em }: OrmContext
   ): Promise<NotesList | null> {

      const repo = em.getRepository(NotesList)
      const list = await repo.findOne({ id: listId })

      if (!list) {
         return null
      }

      const note = new Note(noteInput)

      list.notes = [...list.notes, note]
      em.persistAndFlush(list)

      return list
   }

   //TODO: Add update note, add delete note, add delete noteList.

   @Mutation(() => Note, { nullable: true })
   updateNote(
      @Arg('noteLocation') noteLocation: NoteLocationInput,
      @Arg('updatedNoteFields') updatedNoteFields: NoteUpdateInput,
      @Ctx() { em }: OrmContext
   ): Note | null {

      const repo = em.getRepository(NotesList)

      return null
   }

}