import { Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { CreateListMutationVariables, useCreateListMutation } from '../../../generated/graphql'

interface Props {
   disclosure: any
   btnRef: React.MutableRefObject<undefined>
}

const NewListDrawer: React.FC<Props> = ({ disclosure, btnRef }) => {

   const { isOpen, onClose } = disclosure
   const intialFocusRef = React.useRef()

   const { handleSubmit, errors, register, formState } = useForm()


   const [result, executeCreateList] = useCreateListMutation()

   const validateTitle = () => {
      return true
   }

   const onSubmit = async (createListInput: CreateListMutationVariables) => {

      const response = await executeCreateList(createListInput)

      console.log(response)

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
                           name="title"
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
                     <Button isLoading={formState.isSubmitting} type="submit" color="blue">
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
