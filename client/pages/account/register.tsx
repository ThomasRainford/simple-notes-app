<<<<<<< HEAD
import { Box, Center, Flex } from '@chakra-ui/react'
=======
import { Box, Center, Flex, Input, Stack, Text } from '@chakra-ui/react'
>>>>>>> register-page
import React from 'react'

interface Props {

}

const Register = (props: Props) => {
   return (
<<<<<<< HEAD
      <AccountLayout
         heading="Create an account"
         action="Create Account"
      >
         <Stack spacing="3" pb="10%">
            <Text fontSize="sm">Username</Text>
            <Input placeholder="Enter Username" />
            <Text fontSize="sm">Email</Text>
            <Input placeholder="Enter Email" />
            <Text fontSize="sm">Password</Text>
            <Input placeholder="Enter Password" />
         </Stack>
      </AccountLayout>
=======
      <Flex mt="50%">
         <Flex>
            Register
         </Flex>
      </Flex>
>>>>>>> 2c95ffcf1b8dc7fca23da6a091b86ff0c0e53f26
   )
}

export default Register
