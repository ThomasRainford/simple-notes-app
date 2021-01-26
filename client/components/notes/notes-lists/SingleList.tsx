import { ChevronRightIcon, EditIcon, HamburgerIcon, WarningIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { NotesList } from '../../../generated/graphql'

interface Props {
   list: NotesList
   setCurrentList: React.Dispatch<React.SetStateAction<NotesList>>
}

const SingleList: React.FC<Props> = ({ list, setCurrentList }) => {
   return (
      <Flex justify="space-between" align="center" w="100%" m="5%" >
         <Text>{list.title}</Text>
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
                  <MenuItem icon={<EditIcon />}>Edit Title</MenuItem>
                  <MenuItem icon={<WarningIcon />}>Delete List</MenuItem>
               </MenuList>
            </Menu>
            <Tooltip hasArrow label="View Notes" bg="blue.500">
               <IconButton aria-label="View notes" size="sm" ml="5%" icon={<ChevronRightIcon />}
                  onClick={() => setCurrentList(list)}
               />
            </Tooltip>
         </Flex >
      </Flex >
   )
}

export default SingleList
