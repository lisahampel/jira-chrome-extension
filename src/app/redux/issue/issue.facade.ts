import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {IssueActions} from './issue.actions';

@Injectable({
    providedIn: 'root'
})
export class IssueFacade {
    constructor(private readonly _store: Store) {
    }

    takeScreenshot() {
        return this._store.dispatch(new IssueActions.TakeScreenshot());
    }
}
