import { Timestamp } from "firebase/firestore";


export enum Priority { LOW, NORMAL, HIGH };

export enum Mode { READ, EDIT };

export enum RequestStatus { IDLE, LOADING, DONE };

export enum Status { NONE, SAVED, DELETED, LOADED };



interface TaskData {
    title: string;
    description: string;
    priority: Priority;
    authorId: string;
    authorName: string | null;
    isCompleted: boolean;
}
  
export interface FireDocData extends TaskData {
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
  
export interface TicketCardData extends TaskData {
    createdAt: number;  // milliseconds
    updatedAt: number;
    id: string;
}