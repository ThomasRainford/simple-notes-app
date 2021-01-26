import { ChevronRightIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Text, Tooltip } from '@chakra-ui/react'
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
         <Tooltip hasArrow label="View Notes" bg="blue.500">
            <IconButton aria-label="View notes" size="sm" icon={<ChevronRightIcon />}
               onClick={() => setCurrentList(list)}
            />
         </Tooltip>
      </Flex >
   )
}

export default SingleList
