import { Button, FormControl, FormErrorMessage, FormLabel, Input, Link } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import NextLink from 'next/link'
import React from 'react'
import { FormState, useForm } from "react-hook-form"
import AccountLayout from '../../components/account/AccountLayout'
import { useRegisterMutation, UserRegisterInput } from '../../generated/graphql'

interface Props {

}

const validateUsername = () => {
   return true
}

const validateEmail = () => {
   return true
}

const validatePassword = () => {
   return true
}

const link = (): JSX.Element => (
   <NextLink href={'/account/login'}>
      <Link color="white" pt="1%">
         {'Already have an account?'}
      </Link>
   </NextLink >
)

const Register = ({ }) => {

   const { handleSubmit, errors, register, formState } = useForm();
   const router = useRouter()
   const [result, executeRegister] = useRegisterMutation()

   const onSubmit = async (registerInput: UserRegisterInput) => {

      console.log(result)

      const response = await executeRegister({ registerInput })

      console.log(response.data?.register.user?.username)

      router.push('/')
   }

   return (
      <AccountLayout
         heading="Create an Account"
         link={link()}
      >
         <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.username}>
               <FormLabel>Username</FormLabel>
               <Input
                  name="username"
                  placeholder="Username"
                  ref={register({ validate: validateUsername })}
               />
               <FormErrorMessage>
                  {errors.username && errors.username.message}
               </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email}>
               <FormLabel>Email</FormLabel>
               <Input
                  name="email"
                  placeholder="Email"
                  type="email"
                  ref={register({ validate: validateEmail })}
               />
               <FormErrorMessage>
                  {errors.email && errors.email.message}
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
            <Button
               colorScheme="blue"
               isLoading={formState.isSubmitting}
               type="submit"
               mt='10%'
            >
               Create Account
            </Button>
         </form>
      </AccountLayout>
   )
}

export default Register
