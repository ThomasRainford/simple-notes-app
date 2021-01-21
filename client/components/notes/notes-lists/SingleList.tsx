import { Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { NotesList } from '../../../generated/graphql'

interface Props {
   list: NotesList
   setCurrentList: React.Dispatch<React.SetStateAction<NotesList>>
}

const SingleList: React.FC<Props> = ({ list, setCurrentList }) => {
   return (
      <Flex justify="space-between" align="center" w="100%" m="5%" >
         <Text>{list.title}</Text>
         <Button size="sm"
            onClick={() => setCurrentList(list)}
         >View</Button>
      </Flex >
   )
}

export default SingleList
