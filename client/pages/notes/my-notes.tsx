import { Button, CloseButton, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import NotesLayout from '../../components/notes/NotesLayout'

interface Props {

}

const MyNotes = ({ }) => {

   const [showLists, setShowLists] = useState<boolean>(true)

   return (
      <NotesLayout>
         <Flex h="100vh">
            {showLists
               ?
               <Flex p="1%" border="1px">
                  <CloseButton size="md"
                     onClick={() => {
                        setShowLists(false)
                     }}
                  />
                  Lists
               </Flex>
               :
               <Flex
                  p="1%"
                  border="1px"
                  width="15%"
               >
                  <Button
                     onClick={() => {
                        setShowLists(true)
                     }}
                  >Show Lists</Button>
               </Flex>
            }
            <Flex p="1%" border="1px" w="100%">
               Editor
            </Flex>
         </Flex>
      </NotesLayout>
   )
}

export default MyNotes
