import { Router } from "express";
import messageController from "../Controllers/message.controller";
import authMiddleware from "../Middlewares/auth.middleware";

const messageRoute = Router();

messageRoute.post(
    '/:id',
    authMiddleware.authorizeUserParams,
    authMiddleware.authorizeUserByToken,
    messageController.send
    );

messageRoute.get(
    '/:id',
    authMiddleware.authorizeUserParams,
    authMiddleware.authorizeUserByToken,
    messageController.list
    );

export default messageRoute;