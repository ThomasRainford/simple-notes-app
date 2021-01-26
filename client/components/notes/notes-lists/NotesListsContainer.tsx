import { AddIcon } from '@chakra-ui/icons'
import { Flex, CloseButton, Button, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import NewListDrawer from './NewListDrawer'

interface Props {
   setShowLists: React.Dispatch<React.SetStateAction<boolean>>
}

const NotesListsContainer: React.FC<Props> = ({ children, setShowLists }) => {

   const disclosure = useDisclosure()
   const btnRef = React.useRef()

   return (
      <>
         <Flex direction="column" p="1%" borderRight="1px" borderColor="#CACACA" w="35%">
            <Flex align="center" justify="space-between">
               <CloseButton size="md"
                  onClick={() => {
                     setShowLists(false)
                  }}
               />
               <Button
                  ref={btnRef}
                  colorScheme="teal"
                  variant="outline"
                  leftIcon={<AddIcon />}
                  _hover={{ backgroundColor: "grey", textColor: "white" }}
                  onClick={disclosure.onOpen}
               >
                  New List
               </Button>
            </Flex>
            <Flex direction="column" mt="5%">
               {children}
            </Flex>
         </Flex>

         <NewListDrawer disclosure={disclosure} btnRef={btnRef} />

      </>
   )
}

export default NotesListsContainer
