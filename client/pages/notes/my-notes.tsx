import { ArrowRightIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, IconButton, Text } from '@chakra-ui/react'
import { initUrqlClient, withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from 'urql'
import ListViewerContainer from '../../components/notes/list-viewer/ListViewerContainer'
import Note from '../../components/notes/list-viewer/Note'
import NoteContainer from '../../components/notes/list-viewer/NoteContainer'
import NotesListsContainer from '../../components/notes/notes-lists/NotesListsContainer'
import SingleList from '../../components/notes/notes-lists/SingleList'
import SingleListContainer from '../../components/notes/notes-lists/SingleListContainer'
import NotesLayout from '../../components/notes/NotesLayout'
import { Note as NoteType, NotesList, useGetAllNotesListsQuery } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { GET_ALL_NOTES_lISTS_QUERY } from '../../utils/ssr-queries/getAllNotesListQuery'

interface Props {

}

const MyNotes = ({ }) => {

   //useIsAuth()

   const router = useRouter()

   const [showLists, setShowLists] = useState<boolean>(true)
   const [currentList, setCurrentList] = useState<NotesList>(undefined)

   const [result] = useGetAllNotesListsQuery()

   useEffect(() => {
      // Check if user is logged.
      if (result.error?.message.includes('not authenticated')) {
         router.replace('/account/login')
      }
   }, [result, router])

   return (
      <>
         { !result.fetching && !result.error // only render page when user is logged in.
            ?
            <NotesLayout>
               {result.data?.getAllNotesLists &&
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
                           <Text>TODO: Create a page for creating note lists.</Text>
                           <Text>TODO: Use editable Chakra components for updating notes.</Text>
                        </NotesListsContainer>
                        :
                        // displays no note lists
                        <Flex p="1%" borderRight="1px" borderColor="#CACACA">
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
               }
            </NotesLayout>
            :
            <Text>Loading..</Text>
         }
      </>
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
   await client.query(GET_ALL_NOTES_lISTS_QUERY).toPromise();

   return {
      props: {
         // urqlState is a keyword here so withUrqlClient can pick it up.
         urqlState: ssrCache.extractData()
      },
      //revalidate: 600
   };
}

export default withUrqlClient(createUrqlClient, { ssr: false })(MyNotes)
