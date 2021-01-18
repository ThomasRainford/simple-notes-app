import { Center, Divider, Flex, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
   heading: string
}

const AccountLayout = ({ children, heading }) => {
   return (
      <Flex justify="center" align="center" h="100vh" w="100vw" backgroundColor="#488BFF">
         <Flex direction="column" p="3%" backgroundColor="#fffeee" boxShadow="dark-lg">
            <Text fontSize="2xl">{heading}</Text>
            <Center py="4%">
               <Divider orientation="horizontal" />
            </Center>
            {children}
         </Flex>
      </Flex>
   )
}

export default AccountLayout
