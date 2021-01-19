import { Button, FormControl, FormErrorMessage, FormLabel, Input, Link } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import NextLink from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import AccountLayout from '../../components/account/AccountLayout'
import { LoginMutationVariables, useLoginMutation, useMeQuery } from '../../generated/graphql'
import { useIsAuth } from '../../utils/useIsAuth'

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

   const { handleSubmit, errors, register, formState } = useForm()
   const router = useRouter()
   const [result, executeLogin] = useLoginMutation()
   const [{ data, error }] = useMeQuery()

   // console.log('Me Query: ', data, error?.message)

   const onSubmit = async (loginInput: LoginMutationVariables) => {

      const response = await executeLogin(loginInput)
      console.log(response)
      if (response.data?.login.user) {
         router.push('/')
         console.log('Success')
      }

   }

   return (
      <AccountLayout
         heading="Login"
         link={link()}
      >
         <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
               <FormLabel>Username or Email</FormLabel>
               <Input
                  name="usernameOrEmail"
                  placeholder="Username or Email"
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

export default Login
