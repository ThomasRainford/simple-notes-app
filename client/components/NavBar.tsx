import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, Heading, Link, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import { useLogoutMutation } from '../generated/graphql'
import NextLink from 'next/link'

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
            <NextLink href="/">
               <Heading as={Link} size='lg'>Simple Notes App</Heading>
            </NextLink>
         </Box>
         <Flex>
            <Box>
               <Button variant="outline" onClick={() => setIsOpen(true)} _hover={{ bg: "white", textColor: "#488BFF" }}>
                  Logout
               </Button>

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
                                 const response = await executeLogout()
                                 console.log(response)
                                 router.replace('/')
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
