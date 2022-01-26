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
    USER_DATA ='userData',
    THEME_DATA = 'themeData',
    PAGINATION_ORDER_DATA = 'paginationOrderData'
 }