export enum AppActionTypes {
    USER_INFO = '[User] Get Information',
    LOGGED_IN = '[User] Logged In',
    LOGGED_OUT = '[User] Logged Out'
}

// tslint:disable-next-line:no-namespace
export namespace AppActions {

    export class GetUserInformation {
        readonly type = AppActionTypes.USER_INFO;
        constructor() {
        }
    }

    export class LoggedIn {
        readonly type = AppActionTypes.LOGGED_IN;
        constructor() {
        }
    }

    export class LoggedOut {
        readonly type = AppActionTypes.LOGGED_OUT;
        constructor() {
        }
    }
}

export type AuthenticationAction = AppActions.GetUserInformation
    | AppActions.LoggedIn
    | AppActions.LoggedOut;
