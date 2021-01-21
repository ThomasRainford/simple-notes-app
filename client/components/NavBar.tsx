import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, Heading, Link, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import { useLogoutMutation } from '../generated/graphql'

interface Props {

}

const NavBar = ({ }) => {

   const router = useRouter()
   const [result, executeLogout] = useLogoutMutation()

   const [isOpen, setIsOpen] = useState<boolean>(false)
   const cancelRef = useRef()

   return (
      <Flex
         bg="#488BFF"
         as="nav"
         justify="space-between"
         align="center"
         textColor="white"
         p="2%"
      >
         <Box>
            <Heading size='lg'>Simple Notes App</Heading>
         </Box>
         <Flex>
            <Box>
               <Link onClick={() => setIsOpen(true)}>
                  Logout
               </Link>

               {/* Alert dialog for logging out */}
               <AlertDialog
                  isOpen={isOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={() => setIsOpen(false)}
               >
                  <AlertDialogOverlay>
                     <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                           log Out
                        </AlertDialogHeader>
                        <AlertDialogBody>
                           Are you sure you want to log out?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                           <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                              Cancel
                           </Button>
                           <Button colorScheme="red" ml={3}
                              onClick={async () => {
                                 console.log('logout!')
                                 const lg = await executeLogout()
                                 console.log(lg)
                                 router.replace('/')
                                 //console.log(result)
                              }}>
                              Log Out
                           </Button>
                        </AlertDialogFooter>
                     </AlertDialogContent>
                  </AlertDialogOverlay>
               </AlertDialog>
            </Box>
         </Flex>
      </Flex >
   )
}

export default NavBar
