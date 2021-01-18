import { Box, Center, Flex, Input, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import AccountLayout from '../../components/account/AccountLayout'

interface Props {

}

const Register = (props: Props) => {
   return (
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
   )
}

export default Register
