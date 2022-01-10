export interface loadPageActionPayload {
    pageNo: number;
    docsPerPage: number;
}

export enum RequestStatus { IDLE, LOADING, FAILED };
