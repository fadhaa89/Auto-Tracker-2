import React from 'react';

function ViewVehicle (props) {
    const { vehicle } = props;


    return (
<       div className="modal fade" id="myModal{vehicle._id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
    );
}

export default ViewVehicle;