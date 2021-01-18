import { Button, Center, Divider, Flex, Text, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'

interface Props {
   heading: string
   action: string
}

const AccountLayout = ({ children, heading, action }) => {
   return (
      <Flex direction="column" justify="center" align="center" h="100vh" w="100vw" backgroundColor="#488BFF">
         <Flex direction="column" p="3%" backgroundColor="#fffeee" boxShadow="dark-lg">
            <Text fontSize="2xl">{heading}</Text>
            <Center py="4%">
               <Divider orientation="horizontal" />
            </Center>
            {children}
            <Button colorScheme="blue">{action}</Button>
         </Flex>
         <NextLink href={action === 'Login' ? '/account/register' : '/account/login'}>
            <Link color="white" pt="1%">
               {action === 'Login'
                  ? 'No account? Sign up now!'
                  : 'Already have an account?'
               }
            </Link>
         </NextLink>
      </Flex>
   )
}

export default AccountLayout
