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
