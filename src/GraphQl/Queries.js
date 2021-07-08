import { gql } from "@apollo/client";

export const LOAD_VEHICLS = gql`
    query {
        vehicles{
            user{
                _id,
                    firstName,
                    lastName,
                    email
                },
            year,
            model,
            color,
            vin,
            license_plate,
            toll_tag_number,
            insurance_expire,
            registration_expire,
            purchase_mileage,
            oil_change_mileage,
            tire_change_mileage,
            _id
        }
  }
`