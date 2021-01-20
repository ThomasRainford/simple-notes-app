import { ArrowRightIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, IconButton, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import ListViewerContainer from '../../components/notes/list-viewer/ListViewerContainer'
import NotesLayout from '../../components/notes/NotesLayout'
import NotesListsContainer from '../../components/notes/notes-lists/NotesListsContainer'
import { useIsAuth } from '../../utils/useIsAuth'
import { Note as NoteType, NotesList, useGetAllNotesListsQuery, useMeQuery } from '../../generated/graphql'
import { useRouter } from 'next/router'
import SingleListContainer from '../../components/notes/notes-lists/SingleListContainer'
import SingleList from '../../components/notes/notes-lists/SingleList'
import { initUrqlClient, withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { ssrExchange, dedupExchange, cacheExchange, fetchExchange } from 'urql'
import NoteContainer from '../../components/notes/list-viewer/NoteContainer'
import Note from '../../components/notes/list-viewer/Note'

const GET_ALL_NOTES_LIST_Q = `
query {
   getAllNotesLists {
     id
     user {
          id
     }
   }
 }
`

interface Props {

}

const MyNotes = ({ }) => {

   //useIsAuth()

   const [showLists, setShowLists] = useState<boolean>(true)
   const [currentList, setCurrentList] = useState<NotesList>(undefined)

   const [result] = useGetAllNotesListsQuery()

   return (
      <NotesLayout>
         <Flex h="100vh">
            {showLists
               ?
               // Displays all note lists
               <NotesListsContainer setShowLists={setShowLists}>
                  {
                     result.data?.getAllNotesLists.map((list: NotesList) => (
                        <SingleListContainer key={list.id}>
                           <SingleList list={list} setCurrentList={setCurrentList} />
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
               {!currentList
                  ?
                  <Box>
                     <Heading size="md">Select a Note</Heading>
                  </Box>
                  :
                  <NoteContainer>
                     {currentList.notes.length > 0
                        ?
                        currentList.notes.map((note: NoteType) => (
                           <Note key={note.id} note={note} />
                        ))
                        :
                        <Heading size="md">No Notes to display :(</Heading>
                     }
                  </NoteContainer>
               }
            </ListViewerContainer>
         </Flex>
      </NotesLayout>
   )
}

export async function getServerSideProps() {
   const ssrCache = ssrExchange({ isClient: false });
   const client = initUrqlClient({
      url: "http://localhost:3000/graphql",
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange]
   }, true);
   // This query is used to populate the cache for the query
   // used on this page.
   await client.query(GET_ALL_NOTES_LIST_Q).toPromise();
   return {
      props: {
         // urqlState is a keyword here so withUrqlClient can pick it up.
         urqlState: ssrCache.extractData()
      },
      //revalidate: 600
   };
}

export default withUrqlClient(createUrqlClient, { ssr: false })(MyNotes)
