import { iUserNotAddress } from "./user.interfaces";

export interface iCommentRequest {
  description: string;
}

export type iCommentUpdate = Partial<iCommentRequest>;

export interface iComment {
  id: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  user: iUserNotAddress;
}
