import { Request, Response } from "express";
import userModel from "../Models/user.model";
import { UserInterface } from "../Interface/user.interface";

class UserController {
    public async register(req: Request, res: Response):Promise<Response> {
        const user = await userModel.create(req.body);
        const response = {
            message: "User registed nicely!",
            _id: user._id,
            name: user.name,
        };
        return res.json(response);
    }

    public async authenticate(req: Request, res:Response): Promise<Response> {
        const { name, password } = req.body;

        const user = await userModel.findOne({ name });
        if (!user) {
            return res.status(400).send({message: "Usuário não encontrado!"})
        }

        const validedPassword = await user.comparePasswords(password);
        if (!validedPassword) {
            return res.status(400).send({message: "Senha incorreta!"});
        }

        return res.json({
            user,
            token: user.generateToken()
        });
    }
}

export default new UserController();