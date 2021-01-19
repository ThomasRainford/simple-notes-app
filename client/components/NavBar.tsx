import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {

}

const NavBar = ({ }) => {
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
                  }}
               >Logout</Link>
            </Box>
         </Flex>

      </Flex>
   )
}

export default NavBar
