import { Textarea } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";
import React, { LegacyRef, RefAttributes } from "react";

interface Props {
}

const AutoResizeTextarea = React.forwardRef<HTMLTextAreaElement>((props, ref) => {
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
         minRows={1}
         as={ResizeTextarea}
         {...props}
      />
   )
})

export default AutoResizeTextarea