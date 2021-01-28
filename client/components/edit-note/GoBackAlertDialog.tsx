import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
   isOpen: boolean
   onClose: () => void
}

const GoBackAlertDialog: React.FC<Props> = ({ isOpen, onClose }) => {

   const router = useRouter()
   const cancelRef = React.useRef()

   return (
      <AlertDialog
         isOpen={isOpen}
         leastDestructiveRef={cancelRef}
         onClose={onClose}
      >
         <AlertDialogOverlay>
            <AlertDialogContent>
               <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Unsaved Progress
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
                        //await deleteNote()
                        onClose()
                        router.replace(`/notes/my-notes?listId=${router.query.listId}`)
                     }}
                  >
                     Go Back
                  </Button>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialogOverlay>
      </AlertDialog>
   )
}

export default GoBackAlertDialog
