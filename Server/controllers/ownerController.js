import User from "../models/User";

export const changeRoleToOwner = async (req, res) => {
    try {
        const {userId} = req.user;
        await User.findByIdAndUpdate(userId, {role: 'owner'});
        res.status(200).json({success: true, message: "User role updated to owner"});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
}

//API to list Cars of the logged in owner

export const addCar = async (req, res) => {
    try {
        const {userId} = req.user;
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;

        car.owner = userId;
        car.Image = imageFile.path;         

        const newCar = new Car(car);
        await newCar.save();   
        res.status(201).json({success: true, message: "Car added successfully", car: newCar});
    }   
    catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }   
}
 