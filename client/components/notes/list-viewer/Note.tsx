import { EditIcon, HamburgerIcon, WarningIcon } from '@chakra-ui/icons'
import { Flex, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Note as NoteType, NoteLocationInput, useDeleteNoteMutation } from '../../../generated/graphql'

interface Props {
   note: NoteType
   listId: string
}

const Note: React.FC<Props> = ({ note, listId }) => {

   const { id, title, text } = note

   const router = useRouter()
   const [viewMenu, setViewMenu] = useState<boolean>(false)
   const setMenu = (value: boolean) => {
      setViewMenu(value)
   }

   const [deleteNoteResult, executeDeleteNote] = useDeleteNoteMutation()

   return (
      <Flex p="1.5%" shadow="md" bg="#EAEAEA" align="center" justify="space-between" onMouseEnter={() => setMenu(true)} onMouseLeave={() => setMenu(false)}>
         <Flex direction="column">
            <Heading size="md">{title}</Heading>
            <Text whiteSpace="pre-wrap">{text}</Text>
         </Flex>
         {viewMenu &&

            <Menu isLazy>
               <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon />}
                  size="sm"
                  variant="outline"
               />
               <MenuList>
                  <MenuItem
                     icon={<EditIcon />}
                     onClick={() => {
                        localStorage.setItem('noteId', id)
                        router.push(`/notes/my-notes/edit-note?listId=${listId}`)
                     }}
                  >
                     Edit Note</MenuItem>
                  <MenuItem
                     icon={<WarningIcon />}
                     onClick={async () => {
                        const noteLocation: NoteLocationInput = {
                           listId,
                           noteId: id
                        }
                        const response = await executeDeleteNote({ noteLocation })
                        console.log(response)
                     }}
                  >
                     Delete Note</MenuItem>
               </MenuList>
            </Menu>
         }
      </Flex>
   )
}

export default Note
