import { Button, FormControl, FormErrorMessage, FormLabel, Input, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import { useForm } from "react-hook-form"
import AccountLayout from '../../components/account/AccountLayout'
import { useRegisterMutation, UserRegisterInput } from '../../generated/graphql'

interface Props {

}

const link = (): JSX.Element => (
   <NextLink href={'/account/login'}>
      <Link color="white" pt="1%">
         {'Already have an account?'}
      </Link>
   </NextLink >
)

const button = (): JSX.Element => {
   const [{ }, register] = useRegisterMutation()

   return (
      <Button
         colorScheme="blue"
      >
         Create Account
      </Button>
   )
}

const Register = ({ }) => {

   const { handleSubmit, errors, register, formState } = useForm();

   const validateUsername = () => {
      return true
   }

   const validateEmail = () => {
      return true
   }

   const validatePassword = () => {
      return true
   }

   const onSubmit = (input: UserRegisterInput) => {
      console.log(input)
   }

   return (
      <AccountLayout
         heading="Create an Account"
         link={link()}
         submitButton={button()}
      >
         <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.name}>
               <FormLabel>Username</FormLabel>
               <Input
                  name="username"
                  placeholder="Username"
                  ref={register({ validate: validateUsername })}
               />
               <FormErrorMessage>
                  {errors.name && errors.name.message}
               </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.name}>
               <FormLabel>Email</FormLabel>
               <Input
                  name="email"
                  placeholder="Email"
                  type="email"
                  ref={register({ validate: validateEmail })}
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

export default Register
