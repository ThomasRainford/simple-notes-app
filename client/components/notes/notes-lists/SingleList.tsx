import { Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'

interface Note {
   title: string
   text: string
}

interface Props {
   title: string
   text: string
   setCurrentNote: React.Dispatch<React.SetStateAction<Note>>
}

const SingleList: React.FC<Props> = ({ title, text, setCurrentNote }) => {
   return (
      <Flex justify="space-between" align="center" w="100%" m="5%" >
         <Text>{title}</Text>
         <Button size="sm"
            onClick={() => setCurrentNote({ title, text })}
         >View</Button>
      </Flex >
   )
}

export default SingleList
