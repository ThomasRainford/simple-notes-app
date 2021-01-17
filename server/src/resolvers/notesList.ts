import { NotesList } from "../entities/NotesList";
import { OrmContext } from "../types/types";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Note } from "./object-types/Note";
import { NoteInput } from "./input-types/NoteInput";
import { isAuth } from "../middleware/isAuth";
import { NoteLocationInput } from "./input-types/NoteLocationInput";
import { NoteUpdateInput } from "./input-types/NoteUpdateInput";
import { NotesListResponse } from "./object-types/NotesListResponse";
import { NoteResponse } from "./object-types/NoteResponse";
import { User } from "../entities/User";

@Resolver(NotesList)
export class NotesListResolver {

   @Query(() => NotesListResponse, { nullable: true })
   @UseMiddleware(isAuth)
   async getNotesList(
      @Arg('listId') listId: string,
      @Ctx() { em, req }: OrmContext,
   ): Promise<NotesListResponse> {

      const repo = em.getRepository(NotesList)

      const notesList = await repo.findOne({ id: listId, user: req.session.userId }, ['user'])

      if (!notesList) {
         return {
            errors: [
               {
                  property: 'list',
                  message: 'List does not exist.'
               }
            ]
         }
      }

      return { notesList }
   }

   @Query(() => NoteResponse, { nullable: true })
   @UseMiddleware(isAuth)
   async getNote(
      @Arg('noteLocation') noteLocation: NoteLocationInput,
      @Ctx() { em, req }: OrmContext,
   ): Promise<NoteResponse> {

      const repo = em.getRepository(NotesList)

      const notesList = await repo.findOne({ id: noteLocation.listId, user: req.session.userId }, ['user'])
      const note = notesList?.notes.find(note => note.id === noteLocation.noteId)

      if (!notesList) {
         return {
            errors: [
               {
                  property: 'notesList',
                  message: 'List does not exist.'
               }
            ]
         }
      }

      if (!note) {
         return {
            errors: [
               {
                  property: 'note',
                  message: 'Note does not exist.'
               }
            ]
         }
      }

      return { note }
   }

   @Mutation(() => NotesList)
   @UseMiddleware(isAuth)
   async createList(
      @Ctx() { em, req }: OrmContext,
   ): Promise<NotesList> {

      const notesList = new NotesList([])

      const user = await em.getRepository(User).findOne({ id: req.session['userId']?.toString() })

      if (user) {
         notesList.user = user
         user.lists.add(notesList)
      }

      await em.persistAndFlush(notesList)

      return notesList
   }

   @Mutation(() => NotesListResponse, { nullable: true })
   @UseMiddleware(isAuth)
   async addNote(
      @Arg('listId') listId: string,
      @Arg('noteInput') noteInput: NoteInput,
      @Ctx() { em, req }: OrmContext
   ): Promise<NotesListResponse> {

      const repo = em.getRepository(NotesList)

      const notesList = await repo.findOne({ id: listId, user: req.session.userId }, ['user'])

      if (!notesList) {
         return {
            errors: [
               {
                  property: 'notesList',
                  message: 'List does not exist.'
               }
            ]
         }
      }

      // Check if the 'noteInput.title' already exists.
      let titleExists = false
      notesList.notes.forEach((note: Note) => {
         if (note.title === noteInput.title) {
            titleExists = true
         }
      })

      // If it does return an error.
      if (titleExists) {
         return {
            errors: [
               {
                  property: 'noteInput',
                  message: 'Title already exists.'
               }
            ]
         }
      }

      const note = new Note(noteInput)

      notesList.notes = [...notesList.notes, note]
      em.persistAndFlush(notesList)

      return { notesList }
   }

   @Mutation(() => NoteResponse, { nullable: true })
   @UseMiddleware(isAuth)
   async updateNote(
      @Arg('noteLocation') noteLocation: NoteLocationInput,
      @Arg('updatedNoteFields') updatedNoteFields: NoteUpdateInput,
      @Ctx() { em, req }: OrmContext
   ): Promise<NoteResponse> {

      const repo = em.getRepository(NotesList)

      const notesList = await repo.findOne({ id: noteLocation.listId, user: req.session.userId }, ['user'])
      const note = notesList?.notes.find(note => note.id === noteLocation.noteId)

      if (!notesList) {
         return {
            errors: [
               {
                  property: 'notesList',
                  message: 'List does not exist.'
               }
            ]
         }
      }

      if (!note) {
         return {
            errors: [
               {
                  property: 'note',
                  message: 'Note does not exist.'
               }
            ]
         }
      }

      Object.keys(note).forEach((key) => {
         if (key === 'title' || key === 'text') {
            if (updatedNoteFields[key]) {
               const updated = updatedNoteFields[key] as string
               note[key] = updated
            }
         }
      })

      em.persistAndFlush(notesList)

      return { note }
   }

   @Mutation(() => Boolean)
   @UseMiddleware(isAuth)
   async deleteNotesList(
      @Arg('listId') listId: string,
      @Ctx() { em, req }: OrmContext
   ): Promise<boolean> {

      const repo = em.getRepository(NotesList)

      const listToDelete = await repo.findOne({ id: listId, user: req.session.userId }, ['user'])

      const del = await em.nativeDelete(NotesList, { _id: listToDelete?._id })

      if (del === 0) {
         return false
      }

      return true
   }

   @Mutation(() => Boolean)
   @UseMiddleware(isAuth)
   async deleteNote(
      @Arg('noteLocation') noteLocation: NoteLocationInput,
      @Ctx() { em, req }: OrmContext
   ): Promise<boolean> {

      const repo = em.getRepository(NotesList)

      const list = await repo.findOne({ id: noteLocation.listId, user: req.session.userId }, ['user'])
      const noteToDelete = list?.notes.find(note => note.id === noteLocation.noteId)

      if (!list || !noteToDelete) {
         return false
      }

      // Filter out noteToDelete
      const newNotes: Note[] = list.notes.filter((currentNote) => {
         return currentNote !== noteToDelete
      })

      list.notes = newNotes

      em.persistAndFlush(list)

      return true
   }

}