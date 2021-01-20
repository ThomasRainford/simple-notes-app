import { Flex, CloseButton } from '@chakra-ui/react'
import React from 'react'

interface Props {
   setShowLists: React.Dispatch<React.SetStateAction<boolean>>
}

const NotesListsContainer: React.FC<Props> = ({ children, setShowLists }) => {

   return (
      <Flex p="1%" border="1px">
         <CloseButton size="md"
            onClick={() => {
               setShowLists(false)
            }}
         />
         {children}
      </Flex>
   )
}

export default NotesListsContainer
