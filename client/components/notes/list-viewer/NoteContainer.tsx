import { Flex } from '@chakra-ui/react'
import React from 'react'

interface Props {
}

const NoteContainer = ({ children }) => {
   return (
      <Flex direction="column" width="100%">
         {children}
      </Flex>
   )
}

export default NoteContainer
