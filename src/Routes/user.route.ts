import { Router } from 'express';
import userController from "../Controllers/user.controller";

const userRoute= Router();

userRoute.post('/register', userController.register)
userRoute.post('/login', userController.authenticate)

export default userRoute;