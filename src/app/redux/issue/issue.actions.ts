import {AuthActions} from '../auth/auth.actions';

export enum IssueActionTypes {
    TAKE_SCREENSHOT = '[Issue] Take Screenshot'
}

// tslint:disable-next-line:no-namespace
export namespace IssueActions {

    export class TakeScreenshot {
        static readonly type = IssueActionTypes.TAKE_SCREENSHOT;
        constructor() {
        }
    }

}

export type IssueActions = IssueActions.TakeScreenshot;
