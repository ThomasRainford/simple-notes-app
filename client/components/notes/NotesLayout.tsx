import { Flex } from '@chakra-ui/react'
import React from 'react'
import NavBar from '../NavBar'

interface Props {

}

const NotesLayout = ({ children }) => {
   return (
      <Flex direction="column">
         <NavBar />
         {children}
      </Flex>
   )
}

export default NotesLayout