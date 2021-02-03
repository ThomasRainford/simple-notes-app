import { EditIcon } from '@chakra-ui/icons'
import { Button, Flex, IconButton, Link } from '@chakra-ui/react'
import React from 'react'
import { NoteInput, NotesList, useAddNoteMutation } from '../../../generated/graphql'
import NextLink from 'next/link'

interface Props {
   currentList: NotesList
}

const ListViewerContainer: React.FC<Props> = ({ children, currentList }) => {

   const [result, executeAddNote] = useAddNoteMutation()

   return (
      <Flex direction="column" p="1%" borderLeft="1px" borderColor="#CACACA" w="100%">
         <Flex justify="flex-start" mb="1%">
            {currentList &&

               <NextLink href={`/notes/my-notes/new-note?listId=${currentList.id}`}>
                  <Button
                     aria-label="New Note"
                     colorScheme="teal"
                     variant="outline"
                     as={Link}
                     leftIcon={<EditIcon />}
                     _hover={{ backgroundColor: "grey", textColor: "white" }}
                  >
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
