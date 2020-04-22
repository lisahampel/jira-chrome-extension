export enum AppActionTypes {
    USER_INFO = '[User] Get Information',
    LOGIN = '[User] Login',
    LOGGED_IN = '[User] Logged In',
    LOGGED_OUT = '[User] Logged Out'
}

// tslint:disable-next-line:no-namespace
export namespace AppActions {

  /*  export class GetUserInformation {
        readonly type = AppActionTypes.USER_INFO;
        constructor() {
        }
    }*/

    export class Login {
        static readonly type = AppActionTypes.LOGIN;
        constructor() {
        }
    }

    export class LoggedIn {
        static readonly type = AppActionTypes.LOGGED_IN;
        constructor(readonly user: any) {
        }
    }

    export class LoggedOut {
        static readonly type = AppActionTypes.LOGGED_OUT;
        constructor() {
        }
    }
}

export type AuthenticationAction = AppActions.Login
    | AppActions.LoggedIn
    | AppActions.LoggedOut;
