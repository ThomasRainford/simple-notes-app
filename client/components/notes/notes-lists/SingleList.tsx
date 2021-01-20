import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
   title: string
   text: string
}

const SingleList: React.FC<Props> = ({ title }) => {
   return (
      <Flex>
         <Text>{title}</Text>
      </Flex>
   )
}

export default SingleList
