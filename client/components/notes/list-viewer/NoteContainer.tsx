import { Flex, Stack } from '@chakra-ui/react'
import React from 'react'
import { NotesList } from '../../../generated/graphql'

interface Props {
}

const NoteContainer = ({ children }) => {

   return (
      <Flex direction="column" w="100%">
         <Stack spacing={3}>
            {children}
         </Stack>
      </Flex>
   )

}

export default NoteContainer
