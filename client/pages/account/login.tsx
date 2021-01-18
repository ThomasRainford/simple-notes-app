import { Button, FormControl, FormErrorMessage, FormLabel, Input, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import { FormState, useForm } from 'react-hook-form'
import AccountLayout from '../../components/account/AccountLayout'

interface Props {

}

const validateUsernameOrEmail = () => {
   return true
}

const validatePassword = () => {
   return true
}

const onSubmit = (input) => {
   console.log(input)
}

const link = (): JSX.Element => (
   <NextLink href={'/account/register'}>
      <Link color="white" pt="1%">
         {'No account? Sign up now!'}
      </Link>
   </NextLink >
)

const button = (formState: FormState<Record<string, any>>): JSX.Element => {

   return (
      <Button
         colorScheme="blue"
         isLoading={formState.isSubmitting}
         type="submit"
         mt='10%'
      >
         Login
      </Button>
   )
}

const Login = ({ }) => {

   const { handleSubmit, errors, register, formState } = useForm();
   console.log(errors)

   return (
      <AccountLayout
         heading="Login"
         link={link()}
         submitButton={button(formState)}
      >
         <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.usernameOrEmail}>
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

            <FormControl isInvalid={errors.password}>
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
         </form>
      </AccountLayout>
   )
}

export default Login
