const { Vehicle, User } = require("../../models");

const vehiclesVar = async (vehiclesId) => {
    try{
        const vehicles2 = await Vehicle.find({_id: {$in:vehiclesId}});

        return vehicles2.map(vehicle => ({
            ...vehicle._doc,
            user: userVar.bind(this, vehicle._doc.user)
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
            vehicles: vehiclesVar.bind(this, user2._doc.vehicles)
        }
    }
    catch {
        throw err
    }        
}

module.exports  = {
    hello: () => 'Hello world!',

    users: async () => {
        try{
            const users = await User.find()
            return users.map(_user => {
                return{
                    ..._user._doc,
                    //vehicles: vehiclesVar.bind(this, _user._doc.vehicles)
                    vehicles: async() => {
                        const vehicles2 = await Vehicle.find({_id: {$in:_user._doc.vehicles}});

                        return vehicles2.map(_vehicle => ({
                            ..._vehicle._doc,
                            user: userVar.bind(this, _vehicle._doc.user)
                        }))
                    }
                }
            })
        }catch(error){
            throw error
        }
    },
    user: async (_, args) => {
        const id = args.id;        
        if(!id){
            throw new Error('Invalid request submitted');
        }else{
            const user2 = await User.findById(id).exec();

            if(!user2){
                throw new Error('Invalid request submitted');
            }
            
            return user2;
        }
    },

    vehicles: async () => {
        try{
            const vehicles2 = await Vehicle.find();
            return vehicles2.map(_vehicle => ({
                ..._vehicle._doc,
                /*user: async () => {
                    const user2 = await User.findById( _vehicle._doc.user);        
                    return {
                        ...user2._doc,
                        vehicles: vehiclesVar.bind(this, user2._doc.vehicles)
                    }
                //userVar.bind(this, _vehicle._doc.user)
                }*/
                user: userVar.bind(this, _vehicle._doc.user)
              }))

        }catch(error){
            throw error
        }
    },
};