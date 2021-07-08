import React, { useState } from 'react';
import { SIGN_UP } from "../GraphQL/Mutations"
import { useMutation } from "@apollo/client";

function Register(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");

    const [SignUp, {error}] = useMutation(SIGN_UP);

    const addUser = () => {
        SignUp({
            variables: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                address: address
            },
        });

        if(error){
           console.log(error) 
        }
    };

  return(
    <div class="container mt-5 body-bg">
      <div className="row">
          <div className="col-md-8 offset-2">
              <div className="card">
                    <div className="card-header">
                        <h1 className="card-title">Sign Up</h1>
                    </div> 

                    <div className="card-body">
                        <form method="POST" action="/user">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="firstName">First Name</label>
                                        <input type="text" className="form-control" id="firstName" name="firstName" placeholder="First Name"
                                        value={firstName} 
                                        onChange={ (e) => {
                                            setFirstName(e.target.value)
                                        }}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input type="text" className="form-control" id="lastName" name="lastName" placeholder="Last Name"
                                        value={lastName} 
                                        onChange={ (e) => {
                                            setLastName(e.target.value)
                                        }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input type="email" className="form-control" id="email" name="email" placeholder="Email Address" 
                                        value={email} 
                                        onChange={ (e) => {
                                            setEmail(e.target.value)
                                        }}
                                        />
                                    </div>
                                </div>
                            </div>
                            

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" id="password" name="password" placeholder="Password" 
                                        value={password} 
                                        onChange={ (e) => {
                                            setPassword(e.target.value)
                                        }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="confirmPassword">Password</label>
                                        <input type="confirmPassword" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" 
                                        value={confirmPassword} 
                                        onChange={ (e) => {
                                            setConfirmPassword(e.target.value)
                                        }}
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                        <textarea className="form-control" id="address" name="address" placeholder="Address"
                                        onChange={ (e) => {
                                            setAddress(e.target.value)
                                        }}>{address}</textarea>
                                    </div>
                                </div>                            
                            </div>

                            <div className="col-md-12">
                                <div className="text-center">
                                    <button type="button" className="btn btn-outline-success" onClick={addUser}>Sign Up</button>
                                </div>
                            </div>

                            <div className="col-md-12 mt-3">
                                <div className="text-center">
                                    <p> Alredy have an account? <a href="/login">Click Here </a> to login</p>
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

export default Register;