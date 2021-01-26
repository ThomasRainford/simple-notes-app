import { EditIcon, HamburgerIcon, WarningIcon } from '@chakra-ui/icons'
import { Flex, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Note as NoteType } from '../../../generated/graphql'

interface Props {
   note: NoteType
}

const Note: React.FC<Props> = ({ note }) => {

   const { title, text } = note

   const [viewMenu, setViewMenu] = useState<boolean>(false)
   const setMenu = () => {
      setViewMenu(!viewMenu)
   }

   return (
      <Flex p="1.5%" shadow="md" bg="#EAEAEA" align="center" justify="space-between" onMouseEnter={setMenu} onMouseLeave={setMenu}>
         <Flex direction="column">
            <Heading size="md">{title}</Heading>
            <Text>{text}</Text>
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
                  <MenuItem icon={<EditIcon />}>Edit Note</MenuItem>
                  <MenuItem icon={<WarningIcon />}>Delete Note</MenuItem>
               </MenuList>
            </Menu>
         }
      </Flex>
   )
}

export default Note
