import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import NotesLayout from '../../../components/notes/NotesLayout'

interface Props {

}

const NewNote = ({ }) => {

   const { handleSubmit, errors, register, formState } = useForm()

   const validateTitle = () => {
      return true
   }

   const validateText = () => {
      return true
   }

   const onSubmit = () => {

   }

   return (
      <NotesLayout>
         <Flex direction="column" justify="center" align="center" mx="auto" width="50%" p="2%" mt="5%" boxShadow="dark-lg" borderWidth="2px">
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>

               <FormControl my="5%">
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
               >
                  Go Back
               </Button>
               <Button
                  colorScheme="blue"
                  isLoading={formState.isSubmitting}
                  type="submit"
               >
                  Save
               </Button>

            </form>
         </Flex >
      </NotesLayout >
   )
}

export default NewNote