import { Schema, model, Document } from "mongoose";
import { MessageInterface } from "../Interface/messageInterface";


interface MessageModel extends MessageInterface, Document {}

const MessageSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    addressee: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true, 
    }
});

export default model<MessageModel>('Message', MessageSchema);