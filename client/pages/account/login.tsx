import { Stack, Input, Button, Text, Link } from '@chakra-ui/react'
import React from 'react'
import AccountLayout from '../../components/account/AccountLayout'
import NextLink from 'next/link'

interface Props {

}

const link = (): JSX.Element => (
   <NextLink href={'/account/register'}>
      <Link color="white" pt="1%">
         {'Already have an account?'}
      </Link>
   </NextLink >
)

const button = (): JSX.Element => (
   <Button colorScheme="blue">Create Account</Button>
)

const Login = ({ }) => {
   return (
      <AccountLayout
         heading="Login"
         link={link()}
         submitButton={button()}
      >
         <Stack spacing="3" pb="10%">
            <Text fontSize="sm">Email or Username</Text>
            <Input placeholder="Enter Email or Username" />
            <Text fontSize="sm">Password</Text>
            <Input placeholder="Enter Password" />
         </Stack>
      </AccountLayout>
   )
}

export default Login
