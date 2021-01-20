import { ArrowRightIcon } from '@chakra-ui/icons'
import { Flex, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import ListViewerContainer from '../../components/notes/list-viewer/ListViewerContainer'
import NotesLayout from '../../components/notes/NotesLayout'
import NotesListsContainer from '../../components/notes/notes-lists/NotesListsContainer'
import { useIsAuth } from '../../utils/useIsAuth'
import { useMeQuery } from '../../generated/graphql'
import { useRouter } from 'next/router'
import SingleListContainer from '../../components/notes/notes-lists/SingleListContainer'
import SingleList from '../../components/notes/notes-lists/SingleList'

interface Props {

}

const MyNotes = ({ }) => {

   //useIsAuth()

   const [showLists, setShowLists] = useState<boolean>(true)

   return (
      <NotesLayout>
         <Flex h="100vh">
            {showLists
               ?
               // Displays all note lists
               <NotesListsContainer setShowLists={setShowLists}>
                  {
                     // TODO: map over array of lists   
                  }
                  <SingleListContainer>
                     <SingleList title="Title 1" text="text 1" />
                  </SingleListContainer>
                  <SingleListContainer>
                     <SingleList title="Title 2" text="text 2" />
                  </SingleListContainer>
                  <SingleListContainer>
                     <SingleList title="Title 3" text="text 3" />
                  </SingleListContainer>
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
               Current Notes List
            </ListViewerContainer>
         </Flex>
      </NotesLayout>
   )
}

export default MyNotes
