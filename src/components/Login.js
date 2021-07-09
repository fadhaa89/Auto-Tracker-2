import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { SIGN_IN } from "../GraphQL/Mutations"
import { useMutation } from "@apollo/client";

function Login(props) {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [login] = useMutation(SIGN_IN, {
        variables: {
            email: email,
            password: password
        },
        onCompleted: ({ SignIn }) => {
            console.log(SignIn.token);
            localStorage.setItem('AUTH_TOKEN', SignIn.token);
            localStorage.setItem('LOGGED_IN_USER', JSON.stringify(SignIn));
            history.push('/vehicle');
        },
        onError: (error) => {
            console.log(error)
         }
      });

  return(
     
        <div className="container mt-5 body-bg">
        <div className="row">
            <div className="col-md-8 offset-2">
                <div className="card">
                        <div className="card-header">
                            <h1 className="card-title">Sign In</h1>
                        </div> 

                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input type="email" className="form-control" id="email" name="email" placeholder="Email Address" 
                                    value={email} 
                                    onChange={ (e) => {
                                        setEmail(e.target.value)
                                    }}
                                    />
                                </div>
                                

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" 
                                    value={password} 
                                    onChange={ (e) => {
                                        setPassword(e.target.value)
                                    }}
                                    />
                                </div>

                                <div className="col-md-12">
                                    <div className="text-center">
                                        <button type="button" className="btn btn-outline-success" onClick={login}>Login</button>
                                    </div>
                                </div>

                                <div className="col-md-12 mt-3">
                                    <div className="text-center">
                                        <p> Don't have account? <a href="/sign-up">Click Here </a> to Sign up</p>
                                    </div>
                                </div>
                            </form>
                        </div>

                </div>
            </div>
        </div>   
      </div>     
    )
}

export default Login;