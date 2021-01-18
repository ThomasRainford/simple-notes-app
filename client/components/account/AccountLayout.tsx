import { Button, Center, Divider, Flex, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
   heading: string
   action: string
}

const AccountLayout = ({ children, heading, action }) => {
   return (
      <Flex justify="center" align="center" h="100vh" w="100vw" backgroundColor="#488BFF">
         <Flex direction="column" p="3%" backgroundColor="#fffeee" boxShadow="dark-lg">
            <Text fontSize="2xl">{heading}</Text>
            <Center py="4%">
               <Divider orientation="horizontal" />
            </Center>
            {children}
            <Button colorScheme="blue">{action}</Button>
         </Flex>
      </Flex>
   )
}

export default AccountLayout
