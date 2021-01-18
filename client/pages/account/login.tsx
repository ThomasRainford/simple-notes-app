import { Button, FormControl, FormErrorMessage, FormLabel, Input, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
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

const button = (): JSX.Element => (
   <Button colorScheme="blue">Create Account</Button>
)

const Login = ({ }) => {

   const { handleSubmit, errors, register, formState } = useForm();

   return (
      <AccountLayout
         heading="Login"
         link={link()}
         submitButton={button()}
      >
         <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.name}>
               <FormLabel>Username or Email</FormLabel>
               <Input
                  name="usernameOrEmail"
                  placeholder="Username or Email"
                  ref={register({ validate: validateUsernameOrEmail })}
               />
               <FormErrorMessage>
                  {errors.name && errors.name.message}
               </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.name}>
               <FormLabel>Password</FormLabel>
               <Input
                  name="password"
                  placeholder="Password"
                  type="password"
                  ref={register({ validate: validatePassword })}
               />
               <FormErrorMessage>
                  {errors.name && errors.name.message}
               </FormErrorMessage>
            </FormControl>

            <Button mt={4} colorScheme="teal" isLoading={formState.isSubmitting} type="submit">
               Submit
            </Button>
         </form>
      </AccountLayout>
   )
}

export default Login
