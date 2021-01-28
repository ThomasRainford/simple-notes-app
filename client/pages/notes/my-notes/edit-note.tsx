import { Flex, Heading, Center, Divider, FormControl, FormLabel, Input, FormErrorMessage, Button, Link } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AutoResizeTextarea from '../../../components/AutosizeTextArea'
import GoBackAlertDialog from '../../../components/edit-note/GoBackAlertDialog'
import SaveAlertDialog from '../../../components/new-note/SaveAlertDialog'
import LoadingIndicator from '../../../components/notes/LoadingIndicator'
import NotesLayout from '../../../components/notes/NotesLayout'
import { NoteLocationInput, NoteUpdateInput, useGetNoteQuery, useGetNotesListQuery, useMeQuery, useUpdateNoteMutation } from '../../../generated/graphql'
import { createUrqlClient } from '../../../utils/createUrqlClient'

interface Props {

}

const EditNote = ({ }) => {

   const router = useRouter()
   const listId = router.query.listId as string
   const { handleSubmit, errors, register, formState, setValue } = useForm()
   const [saved, setSaved] = useState<boolean>(false)

   const [isGoBackOpen, setIsGoBackOpen] = useState<boolean>(false)
   const onGoBackClose = () => setIsGoBackOpen(false)
   const [isSaveOpen, setIsSaveOpen] = useState<boolean>(false)
   const onSaveClose = () => setIsSaveOpen(false)

   const [user] = useMeQuery()
   const [updateNoteResult, executeUpdateNote] = useUpdateNoteMutation()

   const [result] = useGetNoteQuery({
      variables: {
         noteLocation: {
            noteId: localStorage.getItem('noteId'),
            listId
         }
      }
   })

   console.log('edit-note')

   const validateTitle = () => {
      return true
   }

   const validateText = () => {
      return true
   }

   const handleGoBack = async () => {
      if (!saved) {
         setIsGoBackOpen(true)
      } else {
         localStorage.removeItem('noteId')
         router.replace(`/notes/my-notes?listId=${router.query.listId}`)
      }
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

   useEffect(() => {

      if (!result.fetching && result.data?.getNote) {
         setValue('title', result.data?.getNote?.note?.title)
         setValue('text', result.data?.getNote?.note?.text)
      }

   }, [result])

   return (
      <>
         {!user.fetching && user.data.me && listId && result.data?.getNote
            ?
            <NotesLayout user={user}>
               <Flex direction="column" justify="center" align="center" mx="auto" width="50%" p="2%" mt="5%" boxShadow="dark-lg" borderWidth="2px">
                  <Heading fontSize="2xl">Edit Note</Heading>
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
            :
            <LoadingIndicator />
         }

         <GoBackAlertDialog isOpen={isGoBackOpen} onClose={onGoBackClose} />
         <SaveAlertDialog isOpen={isSaveOpen} onClose={onSaveClose} />

      </>
   )
}

export default withUrqlClient(createUrqlClient)(EditNote)
