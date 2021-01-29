import { CheckIcon, ChevronRightIcon, CloseIcon, EditIcon, HamburgerIcon, WarningIcon } from '@chakra-ui/icons'
import { ButtonGroup, Editable, EditableInput, EditablePreview, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { NotesList, useDeleteNotesListMutation } from '../../../generated/graphql'
import NewListDrawer from './NewListDrawer'

interface Props {
   list: NotesList
   setCurrentList: React.Dispatch<React.SetStateAction<NotesList>>
}

const SingleList: React.FC<Props> = ({ list, setCurrentList }) => {

   const router = useRouter()

   const disclosure = useDisclosure()
   const btnRef = React.useRef()

   const [result, executeDeleteNotesList] = useDeleteNotesListMutation()

   return (
      <>
         <Flex justify="space-between" align="center" w="100%" m="5%" >
            <Text as="strong" fontSize="2xl">{list.title}</Text>
            <Flex align="center" justify="flex-end" width="50%">
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
                           disclosure.onOpen()
                        }}
                     >
                        Edit Title</MenuItem>
                     <MenuItem
                        icon={<WarningIcon />}
                        onClick={async () => {
                           await executeDeleteNotesList({ listId: list.id })
                        }}
                     >
                        Delete List</MenuItem>
                  </MenuList>
               </Menu>
               <Tooltip hasArrow label="View Notes" bg="blue.500">
                  <IconButton aria-label="View notes" size="sm" ml="5%" icon={<ChevronRightIcon />}
                     onClick={() => {
                        router.replace(`/notes/my-notes?listId=${list.id}`)
                        setCurrentList(list)
                     }}
                  />
               </Tooltip>
            </Flex>
         </Flex>

         {list && <NewListDrawer disclosure={disclosure} btnRef={btnRef} list={list} isUpdating={true} />}

      </>
   )
}

export default SingleList
