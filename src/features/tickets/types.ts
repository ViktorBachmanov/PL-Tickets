import { Timestamp } from "firebase/firestore";


export enum Priority { LOW, NORMAL, HIGH };

export enum Mode { READ, EDIT, NEW };


export enum Status { NONE, SAVED, NOT_SAVED, DELETED, LOADED };



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

export const viewRep = {
    list: "list",
    module: "module"
}