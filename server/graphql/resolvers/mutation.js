const { Vehicle, User } = require("../../models");

const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {SECRET_KEY, stripe} = require('../../config/config');

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
    SignUp: async  (parent, args) => {   
        try {
            const { firstName, lastName, email, password, confirmPassword, address } = args;
            const userExist = await User.findOne({email: email}).exec();
            
            if(userExist){
                throw new Error('User already exist with this email address.');
            }else if(password != confirmPassword){
                throw new Error('Password and confirm password does not matched');
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await  bcrypt.hash(password, salt);
            
            const user = new User({              
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword,
                address: address
            });

            const newUser = await user.save();

            const token = jwt.sign({
                id:newUser.id,
                email: newUser.email
            }, SECRET_KEY);

            return{
                ...newUser._doc,
                _id: newUser.id,
                token
            }

        } catch (error) {
            throw error
        }    
    },
    SignIn: async (parent, args) => {   
        try {
            const { email, password } = args;
            const user = await User.findOne({email: email}).exec();
            
            if(user){
                const validPassword = await bcrypt.compare(password, user.password);
                if(!validPassword){
                    throw new Error('Invalid email or password');
                }else{
                    const token = jwt.sign({
                        id:user.id,
                        email: user.email
                    }, SECRET_KEY);
        
                    return{
                        ...user._doc,
                        _id: user.id,
                        token
                    } 
                }
            }else{
                throw new Error('Invalid email or password');
            }
            
        } catch (error) {
            throw error
        }
    },
    UpdateUser: async (parent, args) => {   
        try {
            const { id, name, email } = args;
            const user = await User.findById(id).exec();
            
            if(user){
                return await User.findOneAndUpdate({
                    _id: id,
                }, {
                    $set: {
                    name, 
                    email
                }},
                {
                    new: true
                });
             
            }else{
                throw new Error('Invalid request submitted');
            }
            
        } catch (error) {
            throw error
        }
    },
    DeleteUser: async (parent, args) => {
        const id = args.id;
        const user = await User.findById(id).exec();
        
        if(user){
            await User.findOneAndRemove({_id: id});

            return true;
         
        }else{
            throw new Error('nvalid request submitted');
        }
    },

    createVehicle: async (_, { year, model, color, vin, license_plate, toll_tag_number, insurance_expire, registration_expire, purchase_mileage, oil_change_mileage, tire_change_mileage, user: userId}) => {
    
        const vehicle = new Vehicle({ year, model, color, vin, license_plate, toll_tag_number, insurance_expire, registration_expire, purchase_mileage, oil_change_mileage, tire_change_mileage, user: userId});

        try {
            const newVehicle = await vehicle.save();

            const user = await User.findById(userId);
            console.log(user);
            user.vehicles.push(vehicle);
            await user.save();

            return {
                ...newVehicle._doc,
                user: userVar.bind(this, userId)
            }

        }catch (err) {
            throw err
        }
            
    },

    UpdateVehicle: async (_, { id, year, model, color, vin, license_plate, toll_tag_number, insurance_expire, registration_expire, purchase_mileage, oil_change_mileage, tire_change_mileage, user: userId}) => {   
        try {
            const vehicle = await Vehicle.findById(id).exec();
            
            if(vehicle){
                return await Vehicle.findOneAndUpdate({
                    _id: id,
                }, {
                    $set: {
                        year, 
                        model, 
                        color, 
                        vin, 
                        license_plate, 
                        toll_tag_number, 
                        insurance_expire, 
                        registration_expire, 
                        purchase_mileage, 
                        oil_change_mileage, 
                        tire_change_mileage
                }},
                {
                    new: true
                });
             
            }else{
                throw new Error('Invalid request submitted');
            }
            
        } catch (error) {
            throw error
        }
    },

    DeleteVehicle: async (parent, args) => {
        const id = args.id;
        const vehicle = await Vehicle.findById(id).exec();
        
        if(vehicle){
            await Vehicle.findOneAndRemove({_id: id});

            return {
                ...vehicle._doc
            };
         
        }else{
            throw new Error('Invalid request submitted');
        }
    },

    Subscription: async (_, {token_id, user: userId}) => {
        try{
            const user = await User.findById(userId);
            const customer = await stripe.customers.create({
                name: user.firstName+' '+user.lastName,
                email: user.email,
                source: token_id
            }) ;

            
            const stripeInfo = {
                token_id: customer.id, amount: 500
            };

            user.subscription.push(stripeInfo);
            await user.save();

            return {
                ...user._doc
            }
        }catch (error) {
            throw error
        }
    },
}