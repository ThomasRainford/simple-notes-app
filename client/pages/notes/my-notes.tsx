import { ArrowRightIcon } from '@chakra-ui/icons'
import { Flex, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import NoteEditorContainer from '../../components/notes/NoteEditorContainer'
import NotesLayout from '../../components/notes/NotesLayout'
import NotesListsContainer from '../../components/notes/NotesListsContainer'

interface Props {

}

const MyNotes = ({ }) => {

   const [showLists, setShowLists] = useState<boolean>(true)

   return (
      <NotesLayout>
         <Flex h="100vh">
            {showLists
               ?
               // Displays all note lists
               <NotesListsContainer setShowLists={setShowLists}>
                  Lists
               </NotesListsContainer>
               :
               // displays no note lists
               <Flex p="1%" border="1px">
                  <IconButton
                     aria-label="Open Lists"
                     icon={<ArrowRightIcon />}
                     onClick={() => {
                        setShowLists(true)
                     }}
                  >Show Lists</IconButton>
               </Flex>
            }
            <NoteEditorContainer>
               Editor
            </NoteEditorContainer>
         </Flex>
      </NotesLayout>
   )
}

export default MyNotes
