export enum RoutesPathes {
    ROOT = '/',
    LOGIN = '/login',
    NOT_FOUND = 'not_found',
    DASHBOARD = 'dashboard',
    TICKETS = "/tickets",
    TICKET_ID = "/tickets/:id",
    CREATE = "/tickets/new"
}

export enum RequestStatus { IDLE, LOADING, FAILED }

export const viewRep = {
    list: "list",
    module: "module"
}

export enum Storage { 
    LIGHT_STATUS = 'lightStatus', 
    VIEW_REP = 'viewRep',
    LOGIN_STATUS ='loginStatus',
 }