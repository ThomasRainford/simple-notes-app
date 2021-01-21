import { Flex } from '@chakra-ui/react'
import React from 'react'

interface Props {

}

const ListViewerContainer = ({ children }) => {
   return (
      <Flex p="1%" borderLeft="1px" borderColor="#CACACA" w="100%">
         {children}
      </Flex>
   )
}

export default ListViewerContainer
