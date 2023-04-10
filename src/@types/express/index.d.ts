import { Client } from "../../entities/client.entity";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/users.entity";

declare global {
    namespace Express {
        interface Request {
            paramUser: User;
        }
    }
}

export {};
