import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { Note as NoteType } from '../../../generated/graphql'

interface Props {
   note: NoteType
}

const Note: React.FC<Props> = ({ note }) => {

   const { title, text } = note

   return (
      <Flex direction="column" p="1.5%" shadow="md" bg="#EAEAEA">
         <Heading size="md">{title}</Heading>
         <Text>{text}</Text>
      </Flex>
   )
}

export default Note
