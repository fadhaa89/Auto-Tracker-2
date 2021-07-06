const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vehicleSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        model: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        vin: {
            type: String,
            required: true
        },
        license_plate: {
            type: String,
            required: true
        },
        toll_tag_number: {
            type: String,
            required: true
        },
        insurance_expire: {
            type: String,
            required: true
        },
        registration_expire: {
            type: String,
            required: true
        },
        purchase_mileage: {
            type: Number,
            required: true
        },
        oil_change_mileage: {
            type: Number,
            required: true
        },
        tire_change_mileage: {
            type: Number,
            required: true
        }
    },
    { timestamps:true}
);

module.exports = mongoose.model("Vehicle", vehicleSchema);