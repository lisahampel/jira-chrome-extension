import {Action, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {AppActions} from './actions/app.actions';
import {AuthService} from './services/auth.service';

// tslint:disable-next-line:no-empty-interface
interface IAppStateModel {
    user: any;
}

@State<IAppStateModel>({
    name: 'app',
    defaults: {
        user: null
    }
})
@Injectable()
export class AppState {
    constructor(private _authService: AuthService) {
    }

    @Action(AppActions.Login)
    async login(context: StateContext<IAppStateModel>) {
        const user = await this._authService.login();
        return context.dispatch(new AppActions.LoggedIn(user));
    }

    @Action(AppActions.LoggedIn)
    async loggedIn(context: StateContext<IAppStateModel>, action: AppActions.LoggedIn) {
        context.patchState({user: action.user});
    }

}
