import {AuthActions} from './auth.actions';

export enum IssueActionTypes {
    TAKE_SCREENSHOT = '[Issue] Take Screenshot'
}

// tslint:disable-next-line:no-namespace
export namespace IssueActions {

    export class TakeScreenshot {
        static readonly type = IssueActionTypes.TAKE_SCREENSHOT;
        constructor(readonly screenshot: any) {
        }
    }

}

export type IssueActions = IssueActions.TakeScreenshot;
