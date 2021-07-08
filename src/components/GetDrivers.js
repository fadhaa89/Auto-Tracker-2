import React, { useEffect, useState } from 'react';
import { useQuery } from "@apollo/client";
import { LOAD_USERS } from "../GraphQL/Queries"
import Header from './Header';


function GetDrivers(){
    const {  data } = useQuery(LOAD_USERS);
    const [ users, setUsers] = useState([]);

    useEffect(() => {
        if(data)
            setUsers(data.users);
    }, [data]);

    return (
        <div>
            <Header/>
            <div className="container mt-5 body-bg">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg-transparent">
                                <div className="row">
                                    <div className="col-md-8">
                                        <p className="card-title">Driver List</p>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="row">
                                { users.map((user)=> {
                                    return <div className="col-md-4 col-lg-4  mt-2" key={user._id}>
                                                <div className="card">
                                                    <div className="card-body">
                                                        <ul className="vehicle">
                                                            <li><b>First Name:</b> { user.firstName }</li>
                                                            <li><b>Last Name:</b> { user.lastName }</li>
                                                            <li><b>Email Address:</b> { user.email }</li>
                                                            <li><b>Address:</b> { user.address }</li> 
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                    })
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default GetDrivers;