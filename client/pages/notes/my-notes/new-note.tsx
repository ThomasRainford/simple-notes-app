import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
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
         <Flex direction="column">
            <form onSubmit={handleSubmit(onSubmit)}>

               <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                     name="title"
                     placeholder="title"
                     ref={register({ validate: validateTitle })}
                  />
                  <FormErrorMessage>
                     {errors.title && errors.title.message}
                  </FormErrorMessage>
               </FormControl>

               <FormControl>
                  <FormLabel>text</FormLabel>
                  <Input
                     name="text"
                     placeholder="Text"
                     type="text"
                     ref={register({ validate: validateText })}
                  />
                  <FormErrorMessage>
                     {errors.text && errors.text.message}
                  </FormErrorMessage>
               </FormControl>
               <Button
                  colorScheme="blue"
                  isLoading={formState.isSubmitting}
                  type="submit"
               >
                  Save
               </Button>

            </form>
         </Flex>
      </NotesLayout>
   )
}

export default NewNote