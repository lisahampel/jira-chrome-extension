import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ScreenshotService} from '../../services/screenshot.service';
import {IssueActions} from './issue.actions';

// tslint:disable-next-line:no-empty-interface
interface IIssueStateModel {
    screenshotUrl: string;
}

@State<IIssueStateModel>({
    name: 'issue',
    defaults: {
        screenshotUrl: null
    }
})
@Injectable()
export class IssueState {
    @Selector()
    static screenshotUrl(state: IIssueStateModel) {
        return state.screenshotUrl;
    }

    constructor(private readonly _screenshotService: ScreenshotService) {
    }

    @Action(IssueActions.TakeScreenshot)
    async takeScreenshotSuccessful(context: StateContext<IIssueStateModel>, action: IssueActions.TakeScreenshot) {
        const screenshotUrl = await this._screenshotService.takeScreenshot();
        context.patchState({screenshotUrl});
    }

}
