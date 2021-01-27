import { Flex } from '@chakra-ui/react'
import React from 'react'
import { UseQueryState } from 'urql'
import { MeQuery } from '../../generated/graphql'
import NavBar from '../NavBar'

interface Props {
   user: UseQueryState<MeQuery, object>
}

const NotesLayout: React.FC<Props> = ({ children, user }) => {
   return (
      <Flex direction="column">
         <NavBar user={user} />
         {children}
      </Flex>
   )
}

export default NotesLayout