import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, CloseButton, FormControl, FormErrorMessage, FormLabel, Input, Link, Text } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/dist/client/router'
import NextLink from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import AccountLayout from '../../components/account/AccountLayout'
import { LoginMutationVariables, useLoginMutation } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'

interface Props {

}

const validateUsernameOrEmail = () => {
   return true
}

const validatePassword = () => {
   return true
}

const link = (): JSX.Element => (
   <NextLink href={'/account/register'}>
      <Link color="white" pt="1%">
         {'No account? Sign up now!'}
      </Link>
   </NextLink >
)

const Login = ({ }) => {

   const router = useRouter()
   const [invalidLogin, setInvalidLogin] = useState<JSX.Element>(null)
   const { handleSubmit, errors, register, formState } = useForm()
   const [result, executeLogin] = useLoginMutation()

   const onSubmit = async (loginInput: LoginMutationVariables) => {

      const response = await executeLogin(loginInput)
      console.log(response)
      if (response.data?.login.user) {
         router.push('/notes/my-notes')
         console.log('Success')
      }

      if (response.data?.login.errors?.length > 0) {
         console.log('Invalid login')
         setInvalidLogin(
            <Alert status="error">
               <AlertIcon />
               <AlertDescription>Incorrect Login</AlertDescription>
               <CloseButton position="absolute" right="8px" top="8px" />
            </Alert>
         )
      }
   }

   return (
      <AccountLayout
         heading="Login"
         link={link()}
      >
         {invalidLogin}
         <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
               <FormLabel>Username or Email</FormLabel>
               <Input
                  name="usernameOrEmail"
                  placeholder="Username or Email"
                  autoComplete="off"
                  ref={register({ validate: validateUsernameOrEmail })}
               />
               <FormErrorMessage>
                  {errors.usernameOrEmail && errors.usernameOrEmail.message}
               </FormErrorMessage>
            </FormControl>

            <FormControl>
               <FormLabel>Password</FormLabel>
               <Input
                  name="password"
                  placeholder="Password"
                  type="password"
                  ref={register({ validate: validatePassword })}
               />
               <FormErrorMessage>
                  {errors.password && errors.password.message}
               </FormErrorMessage>
            </FormControl>
            <Button
               colorScheme="blue"
               isLoading={formState.isSubmitting}
               type="submit"
               mt='10%'
            >
               Login
            </Button>

         </form>
      </AccountLayout>
   )
}

export default withUrqlClient(createUrqlClient)(Login)
