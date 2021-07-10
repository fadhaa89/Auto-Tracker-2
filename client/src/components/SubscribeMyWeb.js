import React, { useState } from 'react'
import { useHistory } from 'react-router';
import StripeCheckout from 'react-stripe-checkout';
import { SUBSCRIBE } from "../GraphQL/Mutations"
import { useMutation } from "@apollo/client";

function SubscribeMyWeb(){
    const history = useHistory();
    const [token, setToken] = useState("");

    const userInfo = JSON.parse(localStorage.getItem("LOGGED_IN_USER"));
    const user = userInfo._id;

    const [Subscribe] = useMutation(SUBSCRIBE, {
        variables: {
            token_id: token,
            user: user
        },
        onCompleted: ({ _s }) => {
            console.log(_s);
            history.push('/vehicle');
        },
        onError: (error) => {
            console.log(error)
         }
      });

    return (
        <StripeCheckout
            token = { _token => {
                console.log(_token);
                setToken(_token.id); 
                Subscribe();
            }}
            stripeKey={"pk_test_MFCv7QdILOWVf5P6OtDvQ5GT003l0whqvB"}
        />
    )
}

export default SubscribeMyWeb;