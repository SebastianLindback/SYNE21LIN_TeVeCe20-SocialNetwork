export interface Message {
    id: number;
    content: string;
    createdDate: Date;
    senderId: number;
    sender: string;
    receiverId: number;
    receiver: string;
}