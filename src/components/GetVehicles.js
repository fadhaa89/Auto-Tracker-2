import '../style/GetVehicles.css';
import React, { useEffect, useState } from 'react';
import { useQuery } from "@apollo/client";
import { LOAD_VEHICLS } from "../GraphQL/Queries"
import Header from './Header';


function GetVeicles(){
    const {  data } = useQuery(LOAD_VEHICLS);
    const [ users, setUsers] = useState([]);

    useEffect(() => {
        if(data)
            setUsers(data.vehicles);
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
                                        <p className="card-title">My Vehicle List</p>
                                    </div>
                                    <div className="col-md-4 text-lg-right text-lg-right">
                                        <button className="btn btn-success my-2 my-sm-0" data-toggle="modal" data-target="#addVehicle">Register New Vehicle</button> 
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="row">
                                { users.map((vehicle)=> {
                                    return <div className="col-md-4 col-lg-4  mt-2">
                                            <div className="card">
                                                <div className="card-body">
                                                    <ul className="vehicle">
                                                        <li><b>Model:</b> { vehicle.model }</li>
                                                        <li><b>Year:</b> { vehicle.year }</li>
                                                        <li><b>Color:</b> { vehicle.color }</li>
                                                        <li><b>Vin:</b> { vehicle.vin }</li>                                        
                                                        <li><b>Licence Plate:</b> { vehicle.license_plate }</li>
                                                        <li><b>Insurance Expire:</b> { vehicle.insurance_expire }</li>
                                                    </ul>
                                                </div>
                                                
                                                <div className="card-footer">
                                                    <div className="text-right">
                                                        <button type="button" className="btn btn-outline-warning mr-1" data-toggle="modal" data-target="#myModal{vehicle._id}">View</button>
                                                        <button type="button" className="btn btn-outline-primary mr-1" data-toggle="modal" data-target="#editModal{vehicle._id}">Edit</button>
                                                        <a href="#" className="btn btn-outline-danger">Delete</a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="modal fade" id="myModal{vehicle._id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-scrollable  modal-lg" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header bg-light">
                                                            <h5 className="modal-title" id="exampleModalLabel">{ vehicle.model } - { vehicle.year }</h5>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="item">
                                                                        <label>Year</label><br/>
                                                                        { vehicle.year }
                                                                    </div>
                                                                    
                                                                    <div className="item">
                                                                        <label>Color</label><br/>
                                                                        { vehicle.color }
                                                                    </div>
                                                                    
                                                                    <div className="item">
                                                                        <label>VIN</label><br/>
                                                                        { vehicle.vin }
                                                                    </div>
                                                                    
                                                                    <div className="item">
                                                                        <label>License Plate</label><br/>
                                                                        { vehicle.license_plate }
                                                                    </div>
                                                                    
                                                                    <div className="item">
                                                                        <label>TollTag Number</label><br/>
                                                                        { vehicle.toll_tag_number }
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="col-md-6">
                                                                    <div className="item">
                                                                        <label>Insurance Expires</label><br/>
                                                                        { vehicle.insurance_expire }
                                                                    </div>
                                                                    
                                                                    <div className="item">
                                                                        <label>Registration Expires</label><br/>
                                                                        { vehicle.registration_expire }
                                                                    </div>
                                                                    
                                                                    <div className="item">
                                                                        <label>Purchase Mileage</label><br/>
                                                                        { vehicle.purchase_mileage }
                                                                    </div>
                                                                    
                                                                    <div className="item">
                                                                        <label>Oil Change Mileage</label><br/>
                                                                        { vehicle.oil_change_mileage }
                                                                    </div>
                                                                    
                                                                    <div className="item">
                                                                        <label>Tire Change Mileage</label><br/>
                                                                        { vehicle.tire_change_mileage }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="modal-footer bg-light">
                                                            <button type="button" class="btn  btn-outline-secondary" data-dismiss="modal">Close</button>
                                                        </div>
                                                    </div>
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

export default GetVeicles;