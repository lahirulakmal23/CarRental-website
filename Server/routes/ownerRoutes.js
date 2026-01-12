import express from 'express';
import { protect } from '../middlewares/auth';
import { changeRoleToOwner } from '../controllers/ownerController.js';

const ownerRoutes = express.Router();

// Example route for getting owner details
ownerRoutes.post('/change-role', protect, changeRoleToOwner);

export default ownerRoutes;