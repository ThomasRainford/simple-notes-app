import { EditIcon } from '@chakra-ui/icons'
import { Button, Flex, IconButton, Link } from '@chakra-ui/react'
import React from 'react'
import { NotesList } from '../../../generated/graphql'
import NextLink from 'next/link'

interface Props {
   currentList: NotesList
}

const ListViewerContainer: React.FC<Props> = ({ children, currentList }) => {
   return (
      <Flex direction="column" p="1%" borderLeft="1px" borderColor="#CACACA" w="100%">
         <Flex justify="flex-start" mb="1%">
            {currentList &&

               <NextLink href={`/notes/my-notes/new-note?listId=${currentList.id}`}>
                  <Button aria-label="New Note" colorScheme="teal" variant="outline" as={Link} leftIcon={<EditIcon />}>
                     New Note
                  </Button>
               </NextLink>

            }
         </Flex>
         { children}
      </Flex >
   )
}

export default ListViewerContainer
