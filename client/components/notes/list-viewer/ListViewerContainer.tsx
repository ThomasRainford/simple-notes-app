import { EditIcon } from '@chakra-ui/icons'
import { Button, Flex, IconButton } from '@chakra-ui/react'
import React from 'react'
import { NotesList } from '../../../generated/graphql'

interface Props {
   currentList: NotesList
}

const ListViewerContainer: React.FC<Props> = ({ children, currentList }) => {
   return (
      <Flex direction="column" p="1%" borderLeft="1px" borderColor="#CACACA" w="100%">
         <Flex justify="flex-end" mb="1%">
            {currentList && currentList.notes.length > 0 &&

               <Button aria-label="New Note" colorScheme="teal" variant="outline" leftIcon={<EditIcon />}>
                  New Note
               </Button>
            }
         </Flex>
         { children}
      </Flex >
   )
}

export default ListViewerContainer
