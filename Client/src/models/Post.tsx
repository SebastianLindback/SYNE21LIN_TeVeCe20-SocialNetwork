export interface Post {
    id: number;
    message: string;
    createdDate: Date;
    receiverId?: number,
    receiverName?: string ,
    senderId?: number,
    senderName?: string
}