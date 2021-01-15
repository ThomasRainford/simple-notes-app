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
   @UseMiddleware(isAuth)
   async updateNote(
      @Arg('noteLocation') noteLocation: NoteLocationInput,
      @Arg('updatedNoteFields') updatedNoteFields: NoteUpdateInput,
      @Ctx() { em, req }: OrmContext
   ): Promise<Note | null> {

      const repo = em.getRepository(NotesList)

      const list = await repo.findOne({ id: noteLocation.listId, userId: req.session['userId']?.toString() })
      const note = list?.notes.find(note => note.id === noteLocation.noteId)

      if (!list || !note) {
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

   @Mutation(() => Boolean)
   @UseMiddleware(isAuth)
   async deleteNotesList(
      @Arg('listId') listId: string,
      @Ctx() { em, req }: OrmContext
   ): Promise<boolean> {

      const repo = em.getRepository(NotesList)

      const list = await repo.findOne({ id: listId, userId: req.session['userId']?.toString() })

      const del = await em.nativeDelete(NotesList, { _id: list?._id })

      if (del === 0) {
         return false
      }

      return true
   }

   // TODO: add delete note

   @Mutation(() => Boolean)
   @UseMiddleware(isAuth)
   async deleteNote(
      @Arg('noteLocation') noteLocation: NoteLocationInput,
      @Ctx() { em, req }: OrmContext
   ): Promise<boolean> {

      const repo = em.getRepository(NotesList)

      const list = await repo.findOne({ id: noteLocation.listId, userId: req.session['userId']?.toString() })
      const note = list?.notes.find(note => note.id === noteLocation.noteId)

      if (!list || !note) {
         return false
      }

      const newNotes = list.notes.filter((currentNote) => {
         return note !== currentNote
      })

      list.notes = newNotes

      em.persistAndFlush(list)

      return true
   }

}