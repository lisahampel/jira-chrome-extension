import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {AuthActions} from '../actions/auth.actions';
import {Observable} from 'rxjs';
import {AppState} from '../app.state';

@Injectable({
    providedIn: 'root'
})
export class AuthFacade {
    constructor(private readonly _store: Store) {
    }

    login() {
        return this._store.dispatch(new AuthActions.Login());
    }

    get isLoggedIn(): Promise<boolean> {
        return this._store.selectOnce(AppState.isLoggedIn).toPromise();
    }

}
