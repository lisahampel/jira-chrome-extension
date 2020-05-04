import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {AppActions} from '../actions/app.actions';
import {Observable} from 'rxjs';
import {AppState} from '../app.state';

@Injectable({
    providedIn: 'root'
})
export class AuthFacade {
    constructor(private readonly _store: Store) {
    }

    login() {
        return this._store.dispatch(new AppActions.Login());
    }

    get isLoggedIn(): Promise<boolean> {
        return this._store.selectOnce(AppState.isLoggedIn).toPromise();
    }

}
