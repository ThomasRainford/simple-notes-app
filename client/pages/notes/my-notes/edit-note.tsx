import { Flex, Heading, Center, Divider, FormControl, FormLabel, Input, FormErrorMessage, Button, Link } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import AutoResizeTextarea from '../../../components/AutosizeTextArea'
import LoadingIndicator from '../../../components/notes/LoadingIndicator'
import NotesLayout from '../../../components/notes/NotesLayout'
import { useGetNoteQuery, useGetNotesListQuery, useMeQuery } from '../../../generated/graphql'
import { createUrqlClient } from '../../../utils/createUrqlClient'

interface Props {

}

const EditNote = ({ }) => {

   const router = useRouter()
   const listId = router.query.listId as string

   const { handleSubmit, errors, register, formState, setValue } = useForm()

   const [result] = useGetNoteQuery({
      variables: {
         noteLocation: {
            noteId: localStorage.getItem('noteId'),
            listId
         }
      }
   })

   const [user] = useMeQuery()

   const validateTitle = () => {
      return true
   }

   const validateText = () => {
      return true
   }

   const onSubmit = () => {

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
                     // onClick={() => handleGoBack()}
                     >
                        Go Back
                  </Button>
                     <Button
                        colorScheme="blue"
                        isLoading={formState.isSubmitting}
                        type="submit"
                     // onClick={() => setSaved(true)}
                     >
                        Save
                  </Button>

                  </form>
               </Flex >
            </NotesLayout>
            :
            <LoadingIndicator />
         }
      </>
   )
}

export default withUrqlClient(createUrqlClient)(EditNote)
