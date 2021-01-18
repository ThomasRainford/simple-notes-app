import { Box, Button, Center, Divider, Flex, Heading, Input, Stack, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {

}

const Register = (props: Props) => {
   return (
      <Flex justify="center" align="center" h="100vh" w="100vw" backgroundColor="#488BFF">
         <Flex direction="column" p="3%" backgroundColor="#fffeee" boxShadow="dark-lg">
            <Text fontSize="2xl">Create an account</Text>
            <Center py="4%">
               <Divider orientation="horizontal" />
            </Center>
            <Stack spacing="3" pb="4%">
               <Text fontSize="sm">Username</Text>
               <Input placeholder="Enter Username" />
               <Text fontSize="sm">Email</Text>
               <Input placeholder="Enter Email" />
               <Text fontSize="sm">Password</Text>
               <Input placeholder="Enter Password" />
            </Stack>
            <Button colorScheme="blue">Submit</Button>
         </Flex >
      </Flex >
   )
}

export default Register
