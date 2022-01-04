export enum Priority { LOW, NORMAL, HIGH };

export enum Mode { NEW, EDIT };

export interface IFormInput {
    title: string;
    priority: Priority;
    description: string;    
}