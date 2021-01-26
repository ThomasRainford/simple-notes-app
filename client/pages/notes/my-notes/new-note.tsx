import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Textarea, Link, Text, Center, Divider, Heading } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import NotesLayout from '../../../components/notes/NotesLayout'
import { createUrqlClient } from '../../../utils/createUrqlClient'
import NextLink from "next/link"
import { useRouter } from 'next/router'
import { useAddNoteMutation, NoteInput, useUpdateNoteMutation, NoteLocationInput, NoteUpdateInput, useDeleteNoteMutation } from '../../../generated/graphql'

interface Props {

}

const NewNote = ({ }) => {

   const router = useRouter()
   const { handleSubmit, errors, register, formState } = useForm()
   const [saved, setSaved] = useState<boolean>(false)

   const [addNoteResult, executeAddNote] = useAddNoteMutation()
   const [updateNoteResult, executeUpdateNote] = useUpdateNoteMutation()
   const [deleteNoteResult, executeDeleteNote] = useDeleteNoteMutation()

   const validateTitle = () => {
      return true
   }

   const validateText = () => {
      return true
   }

   const onSubmit = async (updatedNoteFields: NoteUpdateInput) => {
      const listId = router.query.listId as string

      const noteLocation: NoteLocationInput = {
         listId,
         noteId: addNoteResult.data.addNote.note.id
      }

      const response = await executeUpdateNote({ noteLocation, updatedNoteFields })
   }

   useEffect(() => {
      const noteInput: NoteInput = { title: '', text: '' }
      const listId = router.query.listId as string

      async function addNote() {
         const response = await executeAddNote({ listId, noteInput })
      }

      addNote()
   }, [router, executeAddNote])

   return (
      <NotesLayout>
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
                  <Textarea
                     name="text"
                     variant="flushed"
                     placeholder="Text"
                     type="text"
                     size="lg"
                     ref={register({ validate: validateText })}
                  />
                  <FormErrorMessage>
                     {errors.text && errors.text.message}
                  </FormErrorMessage>
               </FormControl>

               <NextLink href={`/notes/my-notes?listId=${router.query.listId}`}>
                  <Button
                     colorScheme="teal"
                     mr="1%"
                     as={Link}
                     onClick={async () => {
                        if (!saved) {
                           const listId = router.query.listId as string

                           const noteLocation: NoteLocationInput = {
                              listId,
                              noteId: addNoteResult.data.addNote.note.id
                           }
                           const response = await executeDeleteNote({ noteLocation })

                           console.log('DeleteNote: ', response)
                        }
                     }}
                  >
                     Go Back
                  </Button>
               </NextLink>
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
   )
}

export default withUrqlClient(createUrqlClient)(NewNote)