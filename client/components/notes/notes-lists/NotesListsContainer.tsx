import { HamburgerIcon } from '@chakra-ui/icons'
import { Flex, CloseButton, Button } from '@chakra-ui/react'
import React from 'react'
import { useCreateListMutation } from '../../../generated/graphql'

interface Props {
   setShowLists: React.Dispatch<React.SetStateAction<boolean>>
}

const NotesListsContainer: React.FC<Props> = ({ children, setShowLists }) => {

   const [result, executeCreateList] = useCreateListMutation()

   return (
      <Flex direction="column" p="1%" borderRight="1px" borderColor="#CACACA" w="35%">
         <Flex align="center" justify="space-between">
            <CloseButton size="md"
               onClick={() => {
                  setShowLists(false)
               }}
            />
            <Button colorScheme="teal" variant="outline" leftIcon={<HamburgerIcon />}
               onClick={() => {

               }}
            >
               New List
            </Button>
         </Flex>
         <Flex direction="column" mt="5%">
            {children}
         </Flex>
      </Flex >
   )
}

export default NotesListsContainer
