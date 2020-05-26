export enum AuthActionTypes {
    USER_INFO = '[Auth] User Get Information',
    LOGIN = '[Auth] Login',
    LOGGED_IN = '[Auth] User Logged In',
    LOGOUT = '[Auth] Logout',
    LOGGED_OUT = '[Auth] User Logged Out'
}

// tslint:disable-next-line:no-namespace
export namespace AuthActions {

  /*  export class GetUserInformation {
        readonly type = AppActionTypes.USER_INFO;
        constructor() {
        }
    }*/

    export class Login {
        static readonly type = AuthActionTypes.LOGIN;
        constructor() {
        }
    }

    export class LoggedIn {
        static readonly type = AuthActionTypes.LOGGED_IN;
        constructor(readonly user: any) {
        }
    }

    export class Logout {
        static readonly type = AuthActionTypes.LOGOUT;
        constructor() {
        }
    }

    export class LoggedOut {
        static readonly type = AuthActionTypes.LOGGED_OUT;
        constructor() {
        }
    }

}

export type AuthenticationAction = AuthActions.Login
    | AuthActions.LoggedIn
    | AuthActions.Logout
    | AuthActions.LoggedOut;
