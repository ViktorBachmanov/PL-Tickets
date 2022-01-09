export enum Priority { LOW, NORMAL, HIGH };

export enum Mode { READ, EDIT };

export enum RequestStatus { IDLE, LOADING, DONE };

export interface IFormInput {
    title: string;
    priority: Priority;
    description: string;    
}