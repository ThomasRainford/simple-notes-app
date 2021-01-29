import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { CreateListMutationVariables, NotesList, UpdateNotesListMutationVariables, useCreateListMutation, useUpdateNotesListMutation } from '../../../generated/graphql'

interface Props {
   disclosure: any
   btnRef: React.MutableRefObject<undefined>
   list?: NotesList
   isUpdating?: boolean
}

const NewListDrawer: React.FC<Props> = ({ disclosure, btnRef, list, isUpdating }) => {

   const { isOpen, onClose } = disclosure
   const intialFocusRef = React.useRef()

   const router = useRouter()

   const { handleSubmit, errors, register, formState } = useForm()

   const [updateNotesListResult, executeUpdateNotesList] = useUpdateNotesListMutation()
   const [createListResult, executeCreateList] = useCreateListMutation()

   const validateTitle = () => {
      return true
   }

   const onSubmitCreateList = async (createListInput: CreateListMutationVariables) => {
      const response = await executeCreateList(createListInput)

      router.replace(`/notes/my-notes?listId=${response.data.createList._id}`)

      onClose()

   }

   const onSubmitUpdateNotesList = async (updateNotesListInput: UpdateNotesListMutationVariables) => {
      const response = await executeUpdateNotesList({ listId: list.id, newTitle: updateNotesListInput.newTitle })
      console.log(response)
      router.replace(`/notes/my-notes?listId=${response.data.updateNotesList.notesList.id}`)

      onClose()
   }

   const onSubmit = async (input: any) => {
      if (isUpdating) {
         onSubmitUpdateNotesList(input)
      } else {
         onSubmitCreateList(input)
      }
   }

   return (
      <Drawer
         isOpen={isOpen}
         placement="left"
         onClose={onClose}
         initialFocusRef={intialFocusRef}
         finalFocusRef={btnRef}
      >
         <DrawerOverlay>
            <DrawerContent>
               <DrawerCloseButton />
               <DrawerHeader>Create new Notes List</DrawerHeader>

               <DrawerBody>
                  <form onSubmit={handleSubmit(onSubmit)}>

                     <FormControl mb="10%">
                        <Input
                           name="newTitle"
                           defaultValue={list?.title} // Use defaultValue instead of setValue
                           placeholder="Title"
                           autoComplete="off"
                           ref={register({ validate: validateTitle })}
                        />
                        <FormErrorMessage>
                           {errors.title && errors.title.message}
                        </FormErrorMessage>
                     </FormControl>

                     <Button variant="outline" mr={3} onClick={onClose}>
                        Cancel
                     </Button>
                     <Button type="submit" color="blue" isLoading={formState.isSubmitting}>
                        Save
                     </Button>

                  </form>
               </DrawerBody>
            </DrawerContent>
         </DrawerOverlay>
      </Drawer>
   )
}

export default NewListDrawer
