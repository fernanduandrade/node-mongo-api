import { Request, Response, NextFunction } from "express";
import userModel from "../Models/user.model";
import { UserInterface } from "../Interface/user.interface";

const jwt = require("jsonwebtoken");

class AuthMiddleware {
    public async authorizeUserByToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        
        const token = req.query.token || req.headers['x-access-token'];
        
        if (!token) {
            return res.status(401).send({ message: "Acesso restrito" })
        }

        try {

            const userToken = jwt.verify(token, "SECRET") as UserInterface;
            
            const user = await userModel.findById(userToken._id)
    
            if (!user) {
                return res.status(400).send({message: "Usuario não existe!"});
            }

            req.user = user;

            return next();
            
        } catch (error) {
            return res.status(401).send({message: "Token Invalido"})
            
        }

        
    }

    public async authorizeUserParams(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        
        try {
        
            const user = await userModel.findById(req.params.id)
    
            if (!user) {
                return res.status(400).send({message: "Usuario não existe!"});
            }

            req.userChat = user;

            return next();
            
        } catch (error) {
            return res.status(401).send({message: "Usuario Invalido"})
            
        }

        
    }
}

export default new AuthMiddleware();