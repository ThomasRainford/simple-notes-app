import { Flex, Stack } from '@chakra-ui/react'
import React from 'react'

interface Props {
}

const NoteContainer = ({ children }) => {
   return (
      <Flex direction="column" width="100%">
         <Stack spacing={3}>
            {children}
         </Stack>
      </Flex>
   )
}

export default NoteContainer
