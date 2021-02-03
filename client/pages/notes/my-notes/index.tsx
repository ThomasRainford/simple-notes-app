import { ArrowRightIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, IconButton } from '@chakra-ui/react'
import { initUrqlClient, withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from 'urql'
import ListViewerContainer from '../../../components/notes/list-viewer/ListViewerContainer'
import Note from '../../../components/notes/list-viewer/Note'
import NoteContainer from '../../../components/notes/list-viewer/NoteContainer'
import LoadingIndicator from '../../../components/notes/LoadingIndicator'
import NotesListsContainer from '../../../components/notes/notes-lists/NotesListsContainer'
import SingleList from '../../../components/notes/notes-lists/SingleList'
import SingleListContainer from '../../../components/notes/notes-lists/SingleListContainer'
import NotesLayout from '../../../components/notes/NotesLayout'
import { Note as NoteType, NoteLocationInput, NotesList, useDeleteNoteMutation, useGetAllNotesListsQuery, useMeQuery } from '../../../generated/graphql'
import { createUrqlClient } from '../../../utils/createUrqlClient'
import { GET_ALL_NOTES_lISTS_QUERY } from '../../../utils/ssr-queries/getAllNotesListQuery'
import { useIsAuth } from '../../../utils/useIsAuth'

interface Props {

}

// TODO: 
// - Page for updating notes. 

const MyNotes = ({ }) => {

   const router = useRouter()

   const [showLists, setShowLists] = useState<boolean>(true)
   const [currentList, setCurrentList] = useState<NotesList>(undefined)

   const [result] = useGetAllNotesListsQuery()
   const [user] = useMeQuery()
   const [deleteNoteResult, executeDeleteNote] = useDeleteNoteMutation()

   useIsAuth(user)

   useEffect(() => {
      // Show the currentList after visiting new-notes page.
      localStorage.removeItem('noteId')
      const listId = router.query?.listId as string
      if (listId && result.data) {
         const list: NotesList = result.data.getAllNotesLists.find((list: NotesList) => list.id === listId) as NotesList

         // Delete empty notes before setting current list.
         if (list) {
            list.notes.map(async (note) => {
               if (note.title === '' && note.text === '') {
                  const noteLocation: NoteLocationInput = {
                     listId,
                     noteId: note.id
                  }
                  await executeDeleteNote({ noteLocation })
               }
            })
         }
         setCurrentList(list)
      }

   }, [router, result, executeDeleteNote, setCurrentList])

   return (
      <>
         { !user.fetching && user.data?.me // only render page when user is logged in.
            ?
            <NotesLayout user={user}>
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
                     <ListViewerContainer currentList={currentList}>
                        {!currentList
                           ?
                           <Box>
                              <Heading size="md">{result.data.getAllNotesLists.length > 0 ? "Select a List" : "Create a List"}</Heading>
                           </Box>
                           :
                           <NoteContainer>
                              {currentList.notes.length > 0 &&
                                 currentList.notes.map((note: NoteType) => (
                                    <Note key={note.id} note={note} listId={currentList.id} />
                                 ))
                              }
                           </NoteContainer>
                        }
                     </ListViewerContainer>
                  </Flex>
               }
            </NotesLayout>
            :
            <LoadingIndicator />
         }
      </>
   )
}

export async function getServerSideProps() {
   const ssrCache = ssrExchange({ isClient: false });

   const url = /*'http://localhost:3000/graphql'*/ 'https://evening-scrubland-26587.herokuapp.com/graphql'
   const client = initUrqlClient({
      url,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange]
   }, true);

   // This query is used to populate the cache for the query
   // used on this page.
   await client.query(GET_ALL_NOTES_lISTS_QUERY).toPromise();

   // For some reason this line prevents me query from succeeding if the page is refreshed.
   //await client.query(ME_Query).toPromise()

   return {
      props: {
         // urqlState is a keyword here so withUrqlClient can pick it up.
         urqlState: ssrCache.extractData()
      },
      //revalidate: 600
   };
}

export default withUrqlClient(createUrqlClient, { ssr: false })(MyNotes)
