import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter } from '@chakra-ui/react'
import React from 'react'

interface Props {
   disclosure: any
   btnRef: React.MutableRefObject<undefined>
}

const NewListDrawer: React.FC<Props> = ({ disclosure, btnRef }) => {

   const { isOpen, onClose } = disclosure

   return (
      <Drawer
         isOpen={isOpen}
         placement="left"
         onClose={onClose}
         finalFocusRef={btnRef}
      >
         <DrawerOverlay>
            <DrawerContent>
               <DrawerCloseButton />
               <DrawerHeader>Create new Notes List</DrawerHeader>

               <DrawerBody>
                  <Input placeholder="Enter Title..." />
               </DrawerBody>

               <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                     Cancel
                  </Button>
                  <Button color="blue"
                     onClick={() => {

                     }}
                  >Save</Button>
               </DrawerFooter>
            </DrawerContent>
         </DrawerOverlay>
      </Drawer>
   )
}

export default NewListDrawer
