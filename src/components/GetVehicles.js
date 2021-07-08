import '../style/GetVehicles.css';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { CREATE_VEHICLE, UPDATE_VEHICLE, DELETE_VEHICLE } from "../GraphQL/Mutations";
import { LOAD_VEHICLS } from "../GraphQL/Queries"
import { useQuery, useMutation } from "@apollo/client";
import Header from './Header';

const user = JSON.parse(localStorage.getItem("LOGGED_IN_USER"));

function GetVeicles(){
    const history = useHistory();

    const {  data } = useQuery(LOAD_VEHICLS);
    const [ vehicles, setVehicles] = useState([]);

    useEffect(() => {
        if(data)
            setVehicles(data.vehicles);
    }, [data]);

    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [vin, setVin] = useState("");
    const [color, setColor] = useState("");
    const [license_plate, setLP] = useState("");
    const [toll_tag_number, setTGN] = useState("");
    const [insurance_expire, setIE] = useState("");
    const [registration_expire, setRE] = useState("");
    const [purchase_mileage, setPM] = useState("");
    const [oil_change_mileage, setOCM] = useState("");
    const [tire_change_mileage, setTCM] = useState("");
    const [vehicle_id, setVehicleID] = useState("");


    const [registerVehicle] = useMutation(CREATE_VEHICLE, {
        variables: {
            year: year,
            model: model,
            color: color,
            vin: vin,
            license_plate: license_plate,
            toll_tag_number: toll_tag_number,
            insurance_expire: insurance_expire,
            registration_expire: registration_expire,
            purchase_mileage:purchase_mileage,
            oil_change_mileage: oil_change_mileage,
            tire_change_mileage: tire_change_mileage,
            user: user._id
        },
        onCompleted: ({ createVehicle }) => {
            console.log(createVehicle);
            history.go(0)
        }
      });

    const [updateVehicle] = useMutation(UPDATE_VEHICLE, {
    variables: {
        id: vehicle_id,
        year: year,
        model: model,
        color: color,
        vin: vin,
        license_plate: license_plate,
        toll_tag_number: toll_tag_number,
        insurance_expire: insurance_expire,
        registration_expire: registration_expire,
        purchase_mileage:purchase_mileage,
        oil_change_mileage: oil_change_mileage,
        tire_change_mileage: tire_change_mileage,
        user: user._id
    },
    onCompleted: ({ UpdateVehicle }) => {
        console.log(UpdateVehicle);
        history.go(0)
    }
    });

    const [deleteVehicle] = useMutation(DELETE_VEHICLE, {
        variables: {
            id: vehicle_id
        },
        onCompleted: ({ DeleteVehicle }) => {
            console.log(DeleteVehicle);
            history.go(0)
        }
        });

    const confirmDelete = async (options) => {
        console.log(vehicle_id);
        if (window.confirm('Are you sure you wish to delete this item?')) {
            deleteVehicle();
          return;
        }
        console.log("You click No!");
      };


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
                                { vehicles.map((vehicle)=> {
                                    return <div className="col-md-4 col-lg-4  mt-2"  key={vehicle._id}>
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
                                                        <button type="button" className="btn btn-outline-primary mr-1" onClick={ (e) => {setVehicleID(vehicle._id); }} data-toggle="modal" data-target="#editModal{vehicle._id}">Edit</button>
                                                        <button type="button" className="btn btn-outline-danger mr-1" onClick={ () => { setVehicleID(vehicle._id); console.log(vehicle_id); deleteVehicle();} }>Delete</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="modal fade" id="myModal{vehicle._id}" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-scrollable  modal-lg" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header bg-light">
                                                            <h5 className="modal-title" id="exampleModalLabel">{ vehicle.model } - { vehicle.year }</h5>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
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

                                                        <div className="modal-footer bg-light">
                                                            <button type="button" className="btn  btn-outline-secondary" data-dismiss="modal">Close</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> 

                                            <div className="modal fade" id="editModal{vehicle._id}" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-scrollable  modal-lg" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header bg-light">
                                                            <h5 className="modal-title" id="exampleModalLabel">{ vehicle.model } - { vehicle.year }</h5>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <form>
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div className="form-group">
                                                                            <label htmlFor="model">Model</label>
                                                                            <input type="text" className="form-control" id="model" name="model" placeholder="Model" 
                                                                            value={vehicle.model} 
                                                                            onChange={ (e) => {
                                                                                setModel(e.target.value)
                                                                            }}/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">                            
                                                                        <div className="form-group">
                                                                            <label htmlFor="year">Year</label>
                                                                            <input type="text" className="form-control" id="year" name="year" placeholder="Year"
                                                                            value={vehicle.year} 
                                                                            onChange={ (e) => {
                                                                                setYear(e.target.value)
                                                                            }}/>
                                                                        </div>
                                                                        
                                                                        <div className="form-group">
                                                                            <label htmlFor="color">Color</label>
                                                                            <input type="text" className="form-control" id="color" name="color" placeholder="Color"
                                                                            value={vehicle.color} 
                                                                            onChange={ (e) => {
                                                                                setColor(e.target.value)
                                                                            }}/>
                                                                        </div>
                                                                        
                                                                        <div className="form-group">
                                                                            <label htmlFor="vin">VIN</label>
                                                                            <input type="text" className="form-control" id="vin" name="vin" placeholder="VIN"
                                                                            value={vehicle.vin} 
                                                                            onChange={ (e) => {
                                                                                setVin(e.target.value)
                                                                            }}/>
                                                                        </div>
                                                                        
                                                                        <div className="form-group">
                                                                            <label htmlFor="license_plate">Licence Plate</label>
                                                                            <input type="text" className="form-control" id="license_plate" name="license_plate" placeholder="Licence Plate"
                                                                            value={vehicle.license_plate} 
                                                                            onChange={ (e) => {
                                                                                setLP(e.target.value)
                                                                            }}/>
                                                                        </div>
                                                                        
                                                                        <div className="form-group">
                                                                            <label htmlFor="toll_tag_number">TollTag Number</label>
                                                                            <input type="text" className="form-control" id="toll_tag_number" name="toll_tag_number" placeholder="TollTag Number" 
                                                                            value={vehicle.toll_tag_number} 
                                                                            onChange={ (e) => {
                                                                                setTGN(e.target.value)
                                                                            }}/>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="insurance_expire">Insurance Expires</label>
                                                                            <input type="date" className="form-control" id="insurance_expire" name="insurance_expire" placeholder="Insurance Expires"
                                                                            value={vehicle.insurance_expire} 
                                                                            onChange={ (e) => {
                                                                                setIE(e.target.value)
                                                                            }}/>
                                                                        </div>
                                                                        
                                                                        <div className="form-group">
                                                                            <label htmlFor="registration_expire">Registration Expires</label>
                                                                            <input type="date" className="form-control" id="registration_expire" name="registration_expire" placeholder="Registration Expires"
                                                                            value={vehicle.registration_expire} 
                                                                            onChange={ (e) => {
                                                                                setRE(e.target.value)
                                                                            }}/>
                                                                        </div>
                                                                        
                                                                        <div className="form-group">
                                                                            <label htmlFor="purchase_mileage">Purchase Mileage</label>
                                                                            <input type="number" className="form-control" id="purchase_mileage" name="purchase_mileage" placeholder="Purchase Mileage"
                                                                            value={vehicle.purchase_mileage} 
                                                                            onChange={ (e) => {
                                                                                setPM(e.target.value)
                                                                            }}/>
                                                                        </div>
                                                                        
                                                                        <div className="form-group">
                                                                            <label htmlFor="oil_change_mileage">Oil Change Mileage</label>
                                                                            <input type="number" className="form-control" id="oil_change_mileage" name="oil_change_mileage" placeholder="Oil Change Mileage"
                                                                            value={vehicle.oil_change_mileage} 
                                                                            onChange={ (e) => {
                                                                                setOCM(e.target.value)
                                                                            }}/>
                                                                        </div>
                                                                        
                                                                        <div className="form-group">
                                                                            <label htmlFor="tire_change_mileage">Tire Change Mileage</label>
                                                                            <input type="number" className="form-control" id="tire_change_mileage" name="tire_change_mileage" placeholder="Tire Change Mileage"
                                                                            value={vehicle.tire_change_mileage} 
                                                                            onChange={ (e) => {
                                                                                setTCM(e.target.value)
                                                                            }}/>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-md-12">
                                                                        <div className="text-center">
                                                                            <button type="button" className="btn btn-outline-success"  onClick={updateVehicle}>Update</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>

                                                        </div>

                                                        <div className="modal-footer bg-light">
                                                            <button type="button" className="btn  btn-outline-secondary" data-dismiss="modal">Close</button>
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

                <div className="modal fade" id="addVehicle" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-light">
                                <h5 className="modal-title" id="exampleModalLabel">Register new vehicle</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form method="POST" action="/vehicle">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="model">Model</label>
                                                <input type="text" className="form-control" id="model" name="model" placeholder="Model" 
                                                value={model} 
                                                onChange={ (e) => {
                                                    setModel(e.target.value)
                                                }}/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">                            
                                            <div className="form-group">
                                                <label htmlFor="year">Year</label>
                                                <input type="text" className="form-control" id="year" name="year" placeholder="Year"
                                                value={year} 
                                                onChange={ (e) => {
                                                    setYear(e.target.value)
                                                }}/>
                                            </div>
                                            
                                            <div className="form-group">
                                                <label htmlFor="color">Color</label>
                                                <input type="text" className="form-control" id="color" name="color" placeholder="Color"
                                                value={color} 
                                                onChange={ (e) => {
                                                    setColor(e.target.value)
                                                }}/>
                                            </div>
                                            
                                            <div className="form-group">
                                                <label htmlFor="vin">VIN</label>
                                                <input type="text" className="form-control" id="vin" name="vin" placeholder="VIN"
                                                value={vin} 
                                                onChange={ (e) => {
                                                    setVin(e.target.value)
                                                }}/>
                                            </div>
                                            
                                            <div className="form-group">
                                                <label htmlFor="license_plate">Licence Plate</label>
                                                <input type="text" className="form-control" id="license_plate" name="license_plate" placeholder="Licence Plate"
                                                value={license_plate} 
                                                onChange={ (e) => {
                                                    setLP(e.target.value)
                                                }}/>
                                            </div>
                                            
                                            <div className="form-group">
                                                <label htmlFor="toll_tag_number">TollTag Number</label>
                                                <input type="text" className="form-control" id="toll_tag_number" name="toll_tag_number" placeholder="TollTag Number" 
                                                value={toll_tag_number} 
                                                onChange={ (e) => {
                                                    setTGN(e.target.value)
                                                }}/>
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="insurance_expire">Insurance Expires</label>
                                                <input type="date" className="form-control" id="insurance_expire" name="insurance_expire" placeholder="Insurance Expires"
                                                value={insurance_expire} 
                                                onChange={ (e) => {
                                                    setIE(e.target.value)
                                                }}/>
                                            </div>
                                            
                                            <div className="form-group">
                                                <label htmlFor="registration_expire">Registration Expires</label>
                                                <input type="date" className="form-control" id="registration_expire" name="registration_expire" placeholder="Registration Expires"
                                                value={registration_expire} 
                                                onChange={ (e) => {
                                                    setRE(e.target.value)
                                                }}/>
                                            </div>
                                            
                                            <div className="form-group">
                                                <label htmlFor="purchase_mileage">Purchase Mileage</label>
                                                <input type="number" className="form-control" id="purchase_mileage" name="purchase_mileage" placeholder="Purchase Mileage"
                                                value={purchase_mileage} 
                                                onChange={ (e) => {
                                                    setPM(e.target.value)
                                                }}/>
                                            </div>
                                            
                                            <div className="form-group">
                                                <label htmlFor="oil_change_mileage">Oil Change Mileage</label>
                                                <input type="number" className="form-control" id="oil_change_mileage" name="oil_change_mileage" placeholder="Oil Change Mileage"
                                                value={oil_change_mileage} 
                                                onChange={ (e) => {
                                                    setOCM(e.target.value)
                                                }}/>
                                            </div>
                                            
                                            <div className="form-group">
                                                <label htmlFor="tire_change_mileage">Tire Change Mileage</label>
                                                <input type="number" className="form-control" id="tire_change_mileage" name="tire_change_mileage" placeholder="Tire Change Mileage"
                                                value={tire_change_mileage} 
                                                onChange={ (e) => {
                                                    setTCM(e.target.value)
                                                }}/>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="text-center">
                                                <button type="button" className="btn btn-outline-success"  onClick={registerVehicle}>Register</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer bg-light">                    
                                <button type="button" className="btn  btn-outline-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default GetVeicles;