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
      @Ctx() { em, req }: OrmContext,
   ): Promise<NotesList | null> {

      const repo = em.getRepository(NotesList)
      const list = await repo.findOne({ id: listId, userId: req.session['userId']?.toString() })

      if (!list) {
         return null
      }

      return list
   }


   @Query(() => Note, { nullable: true })
   @UseMiddleware(isAuth)
   async getNote(
      @Arg('noteLocation') noteLocation: NoteLocationInput,
      @Ctx() { em, req }: OrmContext,
   ): Promise<Note | null> {

      const repo = em.getRepository(NotesList)

      const list = await repo.findOne({ id: noteLocation.listId, userId: req.session['userId']?.toString() })
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
      @Ctx() { em, req }: OrmContext
   ): Promise<NotesList | null> {

      const repo = em.getRepository(NotesList)
      const list = await repo.findOne({ id: listId, userId: req.session['userId']?.toString() })

      if (!list) {
         return null
      }

      const note = new Note(noteInput)

      list.notes = [...list.notes, note]
      em.persistAndFlush(list)

      return list
   }

   @Mutation(() => Note, { nullable: true })
   async updateNote(
      @Arg('noteLocation') noteLocation: NoteLocationInput,
      @Arg('updatedNoteFields') updatedNoteFields: NoteUpdateInput,
      @Ctx() { em, req }: OrmContext
   ): Promise<Note | null> {

      const repo = em.getRepository(NotesList)
      const list = await repo.findOne({ id: noteLocation.listId, userId: req.session['userId']?.toString() })

      if (!list) {
         return null
      }

      const note = list?.notes.find(note => note.id === noteLocation.noteId)

      if (!note) {
         return null
      }

      Object.keys(note).forEach((key) => {
         if (key === 'title' || key === 'text') {
            if (updatedNoteFields[key]) {
               const updated = updatedNoteFields[key] as string
               note[key] = updated
            }

         }
      })

      em.persistAndFlush(list)

      return note
   }

   // TODO: add delete note, add delete noteList.

}