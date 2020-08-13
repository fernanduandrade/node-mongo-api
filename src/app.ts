import userRoute from './Routes/user.route';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import messageRoute from './Routes/message.route';

export class App {
    private express: express.Application;
    private port = 3000;

    constructor() {
        this.express = express();
        this.middlewares();
        this.database();
        this.routes();
        this.listen();
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
    }

    public getApp(): express.Application {
        return this.express;
    }

    private listen(): void {
        this.express.listen(this.port, () => {
            console.log(`servidor on na porta ` + this.port);
            
        })
    }

    private database(): void {
        mongoose.connect('mongodb+srv://fernando:yamadrom123@cluster0.xfllj.mongodb.net/test?retryWrites=true&w=majority', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    }

    private routes(): void {
        this.express.use('/user', userRoute);
        this.express.use('/message', messageRoute);
    }
}