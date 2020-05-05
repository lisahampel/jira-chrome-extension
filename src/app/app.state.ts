import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable, NgZone} from '@angular/core';
import {AuthActions} from './actions/auth.actions';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';

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
    @Selector()
    static activeUser(state: IAppStateModel) {
        return state.user;
    }
    @Selector([AppState.activeUser])
    static isLoggedIn(state: IAppStateModel, activeUser: any) {
        return activeUser != null;
    }

    constructor(private readonly _authService: AuthService, private readonly _router: Router, private readonly _zone: NgZone) {
    }

    @Action(AuthActions.Login)
    async login(context: StateContext<IAppStateModel>) {
        const user = await this._authService.login();
        return context.dispatch(new AuthActions.LoggedIn(user));
    }

    @Action(AuthActions.LoggedIn)
    async loggedIn(context: StateContext<IAppStateModel>, action: AuthActions.LoggedIn) {
        context.patchState({user: action.user});
        this._zone.run(() => {
            console.log('loginPage: authNavigate');
            this._router.navigate(['/content']);
        });
    }

   /* @Action(AuthActions.TakeScreenshot)
    takeScreenshotSuccessful(context: StateContext<IAppStateModel>, action: AuthActions.TakeScreenshot) {
    context.patchState({screenshot: action.screenshot});

    }*/

}
