const { gql } = require("apollo-server-express");

module.exports = gql`
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        address: String!
        token: String!,
        vehicles: [Vehicle]
    }

    type Vehicle {
        _id: ID!
        user: User!
        year: String!
        model: String!
        color: String!
        vin: String!
        license_plate: String!
        toll_tag_number: String!
        insurance_expire: String!
        registration_expire: String!
        purchase_mileage: String!
        oil_change_mileage: String!
        tire_change_mileage: String!
    }

    type Query {
        hello: String,        
        users: [User!],
        user(id: ID!): User!,
        vehicles: [Vehicle!]
    }

    type Mutation {
        SignUp(firstName: String!,  lastName: String!, email: String!, password: String!, confirmPassword: String!, address: String!) : User 
        SignIn( email: String!, password: String!) : User 
        UpdateUser(id: ID!, name: String!, email: String!) : User
        DeleteUser(id: ID!): Boolean!,
        createVehicle(year: String!,
            model: String!,
            color: String!,
            vin: String!,
            license_plate: String!,
            toll_tag_number: String!,
            insurance_expire: String!,
            registration_expire: String!,
            purchase_mileage: String!,
            oil_change_mileage: String!,
            tire_change_mileage: String!,
            user: String!): Vehicle
    }
`;