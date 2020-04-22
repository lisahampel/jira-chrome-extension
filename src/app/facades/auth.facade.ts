import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {AppActions} from '../actions/app.actions';

@Injectable({
    providedIn: 'root'
})
export class AuthFacade {
    constructor(private readonly _store: Store) {
    }

    login() {
        return this._store.dispatch(new AppActions.Login());
    }
}
