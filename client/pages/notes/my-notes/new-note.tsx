import { Button, Center, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Link, Textarea } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AutoResizeTextarea from '../../../components/AutosizeTextArea'
import GoBackAlertDialog from '../../../components/new-note/GoBackAlertDialog'
import SaveAlertDialog from '../../../components/new-note/SaveAlertDialog'
import NotesLayout from '../../../components/notes/NotesLayout'
import { NoteInput, NoteLocationInput, NoteUpdateInput, useAddNoteMutation, useDeleteNoteMutation, useMeQuery, useUpdateNoteMutation } from '../../../generated/graphql'
import { createUrqlClient } from '../../../utils/createUrqlClient'
import { useIsAuth } from '../../../utils/useIsAuth'

interface Props {

}

const NewNote = ({ }) => {

   const router = useRouter()
   const { handleSubmit, errors, register, formState } = useForm()
   const [saved, setSaved] = useState<boolean>(false)

   const [isGoBackOpen, setIsGoBackOpen] = useState<boolean>(false)
   const onGoBackClose = () => setIsGoBackOpen(false)
   const [isSaveOpen, setIsSaveOpen] = useState<boolean>(false)
   const onSaveClose = () => setIsSaveOpen(false)

   const [addNoteResult, executeAddNote] = useAddNoteMutation()
   const [updateNoteResult, executeUpdateNote] = useUpdateNoteMutation()
   const [deleteNoteResult, executeDeleteNote] = useDeleteNoteMutation()
   const [user] = useMeQuery()

   useIsAuth(user)

   const validateTitle = () => {
      return true
   }

   const validateText = () => {
      return true
   }

   const onSubmit = async (updatedNoteFields: NoteUpdateInput) => {

      const { title, text } = updatedNoteFields

      if (title.length > 0 && text.length > 0) {
         const listId = router.query.listId as string

         const noteLocation: NoteLocationInput = {
            listId,
            noteId: localStorage.getItem('noteId')
         }

         const response = await executeUpdateNote({ noteLocation, updatedNoteFields })

      } else {
         setIsSaveOpen(true)
      }
   }

   const handleGoBack = async () => {
      if (!saved) {
         setIsGoBackOpen(true)
      } else {
         localStorage.removeItem('noteId')
         router.replace(`/notes/my-notes?listId=${router.query.listId}`)
      }
   }

   const deleteNote = async () => {
      const listId = router.query.listId as string

      const noteLocation: NoteLocationInput = {
         listId,
         noteId: localStorage.getItem('noteId')
      }

      if (noteLocation.noteId) {
         const response = await executeDeleteNote({ noteLocation })
      }
   }

   useEffect(() => {
      const noteInput: NoteInput = { title: '', text: '' }
      const listId = router.query.listId as string

      async function addNote() {
         if (!localStorage.getItem('noteId')) {
            const response = await executeAddNote({ listId, noteInput })
            localStorage.setItem('noteId', response.data.addNote.note.id)
         }
      }

      // Add an empty note when the page renders.
      if (listId) {
         addNote()
      }
   }, [router, executeAddNote])

   return (
      <>
         {!user.fetching && user.data.me &&
            <NotesLayout user={user}>
               <Flex direction="column" justify="center" align="center" mx="auto" width="50%" p="2%" mt="5%" boxShadow="dark-lg" borderWidth="2px">
                  <Heading fontSize="2xl">New Note</Heading>
                  <Center py="1%" width="100%">
                     <Divider orientation="horizontal" />
                  </Center>
                  <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>

                     <FormControl mb="5%" mt="2%">
                        <FormLabel>Title</FormLabel>
                        <Input
                           name="title"
                           placeholder="Title"
                           autoComplete="off"
                           ref={register({ validate: validateTitle })}
                           size="lg"
                        />
                        <FormErrorMessage>
                           {errors.title && errors.title.message}
                        </FormErrorMessage>
                     </FormControl>

                     <FormControl mb="5%">
                        <FormLabel>Text</FormLabel>
                        <AutoResizeTextarea ref={register({ validate: validateText })} />
                        <FormErrorMessage>
                           {errors.text && errors.text.message}
                        </FormErrorMessage>
                     </FormControl>

                     <Button
                        colorScheme="teal"
                        mr="1%"
                        as={Link}
                        onClick={() => handleGoBack()}
                     >
                        Go Back
                  </Button>
                     <Button
                        colorScheme="blue"
                        isLoading={formState.isSubmitting}
                        type="submit"
                        onClick={() => setSaved(true)}
                     >
                        Save
                  </Button>

                  </form>
               </Flex >
            </NotesLayout>
         }

         <GoBackAlertDialog isOpen={isGoBackOpen} onClose={onGoBackClose} deleteNote={deleteNote} />
         <SaveAlertDialog isOpen={isSaveOpen} onClose={onSaveClose} />

      </>
   )
}

export default withUrqlClient(createUrqlClient)(NewNote)