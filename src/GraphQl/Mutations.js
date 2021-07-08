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
    mutation SignIn(
            $email: String! 
            $password: String! 
        ){
            SignIn(
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

export const CREATE_VEHICLE = gql`
    mutation createVehicle( 
            $year: String! 
            $model: String! 
            $color: String! 
            $vin: String! 
            $license_plate: String! 
            $toll_tag_number: String! 
            $insurance_expire:  String! 
            $registration_expire: String! 
            $purchase_mileage: String! 
            $oil_change_mileage: String! 
            $tire_change_mileage: String! 
            $user: String! 
        ){
            createVehicle( 
                year: $year 
                model: $model 
                color: $color 
                vin: $vin 
                license_plate: $license_plate 
                toll_tag_number: $toll_tag_number 
                insurance_expire:  $insurance_expire 
                registration_expire: $registration_expire 
                purchase_mileage: $purchase_mileage 
                oil_change_mileage: $oil_change_mileage 
                tire_change_mileage:  $tire_change_mileage
                user: $user 
                ){
                    year,
                    model,
                    color,
                    vin,
                    _id,
                    license_plate
                }
    }
`

export const UPDATE_VEHICLE = gql`
    mutation UpdateVehicle( 
            $id: ID!
            $year: String! 
            $model: String! 
            $color: String! 
            $vin: String! 
            $license_plate: String! 
            $toll_tag_number: String! 
            $insurance_expire:  String! 
            $registration_expire: String! 
            $purchase_mileage: String! 
            $oil_change_mileage: String! 
            $tire_change_mileage: String! 
            $user: String! 
        ){
            UpdateVehicle( 
                id: $id
                year: $year 
                model: $model 
                color: $color 
                vin: $vin 
                license_plate: $license_plate 
                toll_tag_number: $toll_tag_number 
                insurance_expire:  $insurance_expire 
                registration_expire: $registration_expire 
                purchase_mileage: $purchase_mileage 
                oil_change_mileage: $oil_change_mileage 
                tire_change_mileage:  $tire_change_mileage
                user: $user 
                ){
                    year,
                    model,
                    color,
                    vin,
                    _id,
                    license_plate
                }
    }
`

export const DELETE_VEHICLE = gql`
    mutation DeleteVehicle(
        $id: ID!
        ){
            DeleteVehicle(
                id: $id
            ){
                model,
                _id
            }
        }
`