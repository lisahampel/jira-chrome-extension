import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {AuthActions} from './auth.actions';
import {Observable} from 'rxjs';
import {AuthState} from './auth.state';

@Injectable({
    providedIn: 'root'
})
export class AuthFacade {
    constructor(private readonly _store: Store) {
    }

    login() {
        return this._store.dispatch(new AuthActions.Login());
    }

    logout() {
        return this._store.dispatch(new AuthActions.Logout());
    }

    get isLoggedIn(): Promise<boolean> {
        return this._store.selectOnce(AuthState.isLoggedIn).toPromise();
    }

    silentLogin() {
        return this._store.dispatch(new AuthActions.SilentLogin());
    }

}
