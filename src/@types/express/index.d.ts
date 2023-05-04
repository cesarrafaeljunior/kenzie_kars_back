import { Advertised_car } from "../../entities/adverts.entity";
import { Client } from "../../entities/client.entity";
import { Comment } from "../../entities/comments.entity";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/users.entity";

declare global {
  namespace Express {
    interface Request {
      paramUser: User;
      authUser: User;
      paramAdvertise: Advertised_car;
      paramComment: Comment;
    }
  }
}

export {};
