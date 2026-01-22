import { format } from "path";
import Car from "../models/Car.js";
import User from "../models/User.js";
import fs from 'fs';

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

        //upload image to imagekit
       const fileBuffer = fs.readFileSync(imageFile.path); 
       await imagekit.upload({
            file : fileBuffer,
            fileName : imageFile.originalname, 
            folder: "/cars"      
        });

        var optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { width: '1280'},
                { quality:'auto'},
                {format: 'webp'}
            ]
        });

        const imageUrl = optimizedImageUrl;
        await Car.create({...car,owner:userId,image})
        res.status(201).json({success: true, message: "Car added successfully"});
        
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }     
     
}

 