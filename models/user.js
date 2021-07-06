const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },

        lastName: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        address: {
            type: String,
            required: true
        },
        
        vehicles: [{
            type: Schema.Types.ObjectId,
            ref: 'Vehicle',
            required: false,
        }]
    },
    { timestamps:true}
);

module.exports = mongoose.model("User", userSchema);