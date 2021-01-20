import { Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'

interface Note {
   title: string
   text: string
}

interface Props {
   note: Note
   setCurrentNote: React.Dispatch<React.SetStateAction<Note>>
}

const SingleList: React.FC<Props> = ({ note, setCurrentNote }) => {
   return (
      <Flex justify="space-between" align="center" w="100%" m="5%" >
         <Text>{note.title}</Text>
         <Button size="sm"
            onClick={() => setCurrentNote({ title: note.title, text: note.text })}
         >View</Button>
      </Flex >
   )
}

export default SingleList
