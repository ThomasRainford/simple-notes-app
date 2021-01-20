import { Flex, CloseButton } from '@chakra-ui/react'
import React from 'react'

interface Props {
   setShowLists: React.Dispatch<React.SetStateAction<boolean>>
}

const NotesListsContainer: React.FC<Props> = ({ children, setShowLists }) => {

   return (
      <Flex direction="column" p="1%" border="1px" w="25%">
         <CloseButton size="md"
            onClick={() => {
               setShowLists(false)
            }}
         />
         <Flex direction="column">
            {children}
         </Flex>
      </Flex>
   )
}

export default NotesListsContainer
