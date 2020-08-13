import { Response, Request } from "express";
import messageModel from "../Models/message.model";

class MessageController {
    public async send(req: Request, res: Response): Promise<Response> {

        const message = await messageModel.create({
            text: req.body.text,
            sender: req.user._id,
            addressee: req.userChat._id,
        });

        return res.json(message);
    }

    public async list(req: Request, res: Response): Promise<Response> {
        const idUserLogged = req.user._id;
        const idUserChat = req.userChat._id;

        const messages = await messageModel.find({
            $or: [
                { $and: [ { sender: idUserLogged }, { addressee: idUserChat } ] },
                { $and: [ { sender: idUserChat }, { addressee: idUserLogged } ] },
            ]
        }).sort("createdAt");

        const messageChat = messages.map(message => {
            return {
                text: message.text,
                createdAt: message.createdAt,
                isSender: message.sender == String(idUserLogged)
            }
        });

        return res.json(messageChat);
    }
}

export default new MessageController();