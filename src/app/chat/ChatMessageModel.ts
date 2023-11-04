export interface ChatMessageModel {
    text: string;
    isUser: boolean; // To differentiate between user and AI messages
}