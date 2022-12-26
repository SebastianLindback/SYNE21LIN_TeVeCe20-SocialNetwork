import { Message } from "./Message";
import { User } from "./User";

export interface MessagesResponse {
  Agent: any;
  users: any;
  messages: Message[];
  usersInConversation: User[];
}
