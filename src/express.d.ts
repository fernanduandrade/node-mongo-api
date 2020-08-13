import { UserInterface } from "./Interface/user.interface";

declare global {
    namespace Express {
        interface Request {
            user?: UserInterface;
            userChat?: UserInterface;
        }
    }
}