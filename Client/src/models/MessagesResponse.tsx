import { Message } from "./Message";
import { User } from "./User";

export interface MessagesResponse {
    messages: Message[];
    usersInConversation : User[]
}
