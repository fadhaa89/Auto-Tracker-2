import { gql } from "@apollo/client";

export const SIGN_UP = gql`
    mutation SignUp(
            $firstName: String!
            $lastName: String!
            $email: String! 
            $password: String! 
            $confirmPassword: String! 
            $address: String! 
        ){
        SignUp(
            firstName: $firstName 
            lastName: $lastName
            email: $email
            password: $password
            confirmPassword: $confirmPassword
            address: $address
        ){
            firstName,
            lastName,
            email,
            address,
            _id,
            token   
        }
  }
`

export const SIGN_IN = gql`
    mutation SignUp(
            $email: String! 
            $password: String! 
        ){
        SignUp(
            email: $email
            password: $password
        ){
            firstName,
            lastName,
            email,
            address,
            _id,
            token   
        }
  }
`