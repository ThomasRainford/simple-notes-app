import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { Note, NotesList } from '../../../generated/graphql'

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
