import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Textarea, Link, Text, Center, Divider, Heading, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay } from '@chakra-ui/react'
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

   const [isOpen, setIsOpen] = useState<boolean>(false)
   const onClose = () => setIsOpen(false)
   const cancelRef = React.useRef()

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

   const handleGoBack = async () => {
      if (!saved) {
         setIsOpen(true)
      } else {
         router.replace(`/notes/my-notes?listId=${router.query.listId}`)
      }
   }

   const deleteNote = async () => {
      const listId = router.query.listId as string

      const noteLocation: NoteLocationInput = {
         listId,
         noteId: addNoteResult.data.addNote.note.id
      }
      const response = await executeDeleteNote({ noteLocation })

      console.log('DeleteNote: ', response)
   }

   useEffect(() => {
      const noteInput: NoteInput = { title: '', text: '' }
      const listId = router.query.listId as string

      async function addNote() {
         const response = await executeAddNote({ listId, noteInput })
      }

      // Add an empty note when the page renders.
      addNote()
   }, [router, executeAddNote])

   return (
      <>
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

         <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
         >
            <AlertDialogOverlay>
               <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                     Delete Customer
                  </AlertDialogHeader>

                  <AlertDialogBody>
                     Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                     <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                     </Button>
                     <Button
                        ml={3}
                        colorScheme="red"
                        onClick={async () => {
                           await deleteNote()
                           onClose()
                           router.replace(`/notes/my-notes?listId=${router.query.listId}`)
                        }}
                     >
                        Delete
                     </Button>
                  </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialogOverlay>
         </AlertDialog>
      </>
   )
}

export default withUrqlClient(createUrqlClient)(NewNote)