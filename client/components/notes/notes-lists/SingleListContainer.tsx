import { Flex } from '@chakra-ui/react'
import React from 'react'

interface Props {

}

const SingleListContainer = ({ children }) => {
   return (
      <Flex mb="5%" bg="#DADADA">
         {children}
      </Flex>
   )
}

export default SingleListContainer
