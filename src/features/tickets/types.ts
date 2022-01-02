export enum Priority { LOW, NORMAL, HIGH };

export interface IFormInput {
    title: string;
    priority: Priority;
    description: string;    
}