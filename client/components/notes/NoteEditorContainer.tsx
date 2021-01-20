import { Flex } from '@chakra-ui/react'
import React from 'react'

interface Props {

}

const NoteEditorContainer = ({ children }) => {
   return (
      <Flex p="1%" border="1px" w="100%">
         {children}
      </Flex>
   )
}

export default NoteEditorContainer
