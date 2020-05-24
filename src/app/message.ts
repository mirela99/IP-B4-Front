export interface Message {
    content: string,
    fromId: string,
    fromName: string,
    toId: string,
    messageType: string,
    responseTo: string;
}