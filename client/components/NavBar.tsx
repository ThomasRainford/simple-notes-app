import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react'
import React from 'react'
import { useLogoutMutation } from '../generated/graphql'

interface Props {

}

const NavBar = ({ }) => {

   const [result, executeLogout] = useLogoutMutation()

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
               <Link
                  onClick={() => {
                     console.log('logout!')
                     executeLogout()
                     console.log(result)
                  }}
               >Logout</Link>
            </Box>
         </Flex>

      </Flex>
   )
}

export default NavBar
