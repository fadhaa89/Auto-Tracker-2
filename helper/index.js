const { Vehicle, User } = require("../../models");

const vehiclesVar = async (vehiclesId) => {
    try{
        const vehicles2 = await Vehicle.find({_id: {$in:vehiclesId}});

        return vehicles2.map(vehicle => ({
            ...vehicle._doc,
            user: userById.bind(this, vehicle._doc.user)
        }))
    }
    catch {
        throw err
    }
    
}

const userVar = async (userId) => {
    try{
        const user2 = await User.findById(userId);

        return {
            ...user2._doc,
            vehicles: vehicles.bind(this, user2._doc.vehicles)
        }
    }
    catch {
        throw err
    }        
}

module.exports = {
    vehiclesVar,
    userVar
}
