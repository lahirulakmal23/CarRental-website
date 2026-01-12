import express from 'express';
import cors from 'cors';
import connectDB from './configs/DB_connection.js';
import userRouter from './routes/userRoutes.js';
import ownerRoutes from './routes/ownerRoutes.js';


//initiallize express app
const app = express();

//connect to database
await connectDB();

//mildlewares
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Car Rental Service API is running');
});

app.use('/api/user', userRouter);
app.use('/api/owner', ownerRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}   
);

console.log("Server restarted");


import dotenv from 'dotenv';
dotenv.config();    
