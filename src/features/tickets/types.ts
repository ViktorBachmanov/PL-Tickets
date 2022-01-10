export enum Priority { LOW, NORMAL, HIGH };

export enum Mode { READ, EDIT };

export enum RequestStatus { IDLE, LOADING, DONE };

export enum Status { NONE, SAVED, DELETED, LOADED };

export interface IFormInput {
    title: string;
    priority: Priority;
    description: string;    
}