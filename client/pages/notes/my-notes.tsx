import { ArrowRightIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, IconButton, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import ListViewerContainer from '../../components/notes/list-viewer/ListViewerContainer'
import NotesLayout from '../../components/notes/NotesLayout'
import NotesListsContainer from '../../components/notes/notes-lists/NotesListsContainer'
import { useIsAuth } from '../../utils/useIsAuth'
import { useMeQuery } from '../../generated/graphql'
import { useRouter } from 'next/router'
import SingleListContainer from '../../components/notes/notes-lists/SingleListContainer'
import SingleList from '../../components/notes/notes-lists/SingleList'

interface Note {
   title: string
   text: string
}

interface Props {

}

const MyNotes = ({ }) => {

   //useIsAuth()

   const [showLists, setShowLists] = useState<boolean>(true)
   const [currentNote, setCurrentNote] = useState<Note>(undefined)

   const allNotes: Note[] = [
      {
         title: "Title 1",
         text: "text 1"
      },
      {
         title: "Title 2",
         text: "text 2"
      },
      {
         title: "Title 3",
         text: "text 3"
      },
   ]

   return (
      <NotesLayout>
         <Flex h="100vh">
            {showLists
               ?
               // Displays all note lists
               <NotesListsContainer setShowLists={setShowLists}>
                  {
                     allNotes.map((note) => (
                        <SingleListContainer key={note.title}>
                           <SingleList note={note} setCurrentNote={setCurrentNote} />
                        </SingleListContainer>
                     ))
                  }
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
            <ListViewerContainer>
               {!currentNote
                  ?
                  <Box>
                     <Text>Select a Note</Text>
                  </Box>
                  :
                  <Box>
                     <Heading>{currentNote?.title}</Heading>
                     <Text>{currentNote?.text}</Text>
                  </Box>
               }
            </ListViewerContainer>
         </Flex>
      </NotesLayout>
   )
}

export default MyNotes
