import { Textarea } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";
import React, { LegacyRef, ReactNode, RefAttributes } from "react";

interface Props {
   children: ReactNode
   value: string
}

const AutoResizeTextarea: any = React.forwardRef<HTMLTextAreaElement>((props: Props, ref) => {
   return (
      <Textarea
         name="text"
         variant="flushed"
         placeholder="Text"
         minH="unset"
         overflow="hidden"
         w="100%"
         resize="none"
         ref={ref}
         minRows={4}
         as={ResizeTextarea}
         {...props}
      />
   )
})

export default AutoResizeTextarea