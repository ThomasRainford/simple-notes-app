import { Stack, Input, Button, Text } from '@chakra-ui/react'
import React from 'react'
import AccountLayout from '../../components/account/AccountLayout'

interface Props {

}

const Login = ({ }) => {
   return (
      <AccountLayout
         heading="Login"
         action="Login"
      >
         <Stack spacing="3" pb="4%">
            <Text fontSize="sm">Email or Username</Text>
            <Input placeholder="Enter Email or Username" />
            <Text fontSize="sm">Password</Text>
            <Input placeholder="Enter Password" />
         </Stack>
      </AccountLayout>
   )
}

export default Login
