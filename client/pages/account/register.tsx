import { Box, Center, Flex, Input, Stack, Text, Link, Button } from '@chakra-ui/react'
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

const Register = (props: Props) => {
   return (
      <AccountLayout
         heading="Create an Account"
         link={link()}
         submitButton={button()}
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
