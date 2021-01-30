import { Button, Flex, Heading, Link, Text } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import NextLink from 'next/link'
import React from 'react'
import { createUrqlClient } from '../utils/createUrqlClient'

function Home() {

   return (
      <Flex direction="column" justify="center" align="center" w="100vw" h="100vh" bg="#488BFF">
         <Flex direction="column" mb="4%" align="center">
            <Heading fontFamily="sans-serif" textColor="white" size="3xl">Simple Notes App</Heading>
            <Text textColor="white" fontSize="lg" mt="2%">Easily create and update notes on the web!</Text>
         </Flex>
         <Flex>
            <Text textColor="white" fontSize="lg" fontStyle="italic" mb="4%">Get started now by registering an account.</Text>
         </Flex>
         <Flex>
            <NextLink href="/account/login">
               <Button
                  bg="white"
                  textColor="#488BFF"
                  mr="5%"
                  size="lg"
                  as={Link}
               >
                  Login
            </Button>
            </NextLink>
            <NextLink href="/account/register">
               <Button
                  variant="outline"
                  textColor="white"
                  size="lg"
                  as={Link}
                  _hover={{ textColor: "#488BFF", backgroundColor: "white" }}
               >
                  Register
               </Button>
            </NextLink>
         </Flex>
      </Flex>
   )
}

export default withUrqlClient(createUrqlClient)(Home)