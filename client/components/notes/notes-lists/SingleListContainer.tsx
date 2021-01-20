import { Flex } from '@chakra-ui/react'
import React from 'react'

interface Props {

}

const SingleListContainer = ({ children }) => {
   return (
      <Flex mb="3%" bg="#CACACA">
         {children}
      </Flex>
   )
}

export default SingleListContainer
