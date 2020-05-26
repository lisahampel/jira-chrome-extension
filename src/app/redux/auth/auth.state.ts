import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable, NgZone} from '@angular/core';
import {AuthActions} from './auth.actions';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

interface IAuthStateModel {
    user: any;
}

@State<IAuthStateModel>({
    name: 'auth',
    defaults: {
        user: null
    }
})
@Injectable()
export class AuthState {
    @Selector()
    static activeUser(state: IAuthStateModel) {
        return state.user;
    }
    @Selector([AuthState.activeUser])
    static isLoggedIn(state: IAuthStateModel, activeUser: any) {
        return activeUser != null;
    }

    constructor(private readonly _authService: AuthService, private readonly _router: Router, private readonly _zone: NgZone,
                private readonly _location: Location) {
    }

    @Action(AuthActions.Login)
    async login(context: StateContext<IAuthStateModel>) {
        const accessToken = await this._authService.login();
        const user = await this._authService.getActiveUser(accessToken);
        const issues = await this._authService.getImacsIssue(accessToken, 'assignee="Lisa Hampel"');
        console.log('@Action login user: ', user);
        console.log('@Action login issues: ', issues);
        return context.dispatch(new AuthActions.LoggedIn(user));
    }

    @Action(AuthActions.LoggedIn)
    async loggedIn(context: StateContext<IAuthStateModel>, action: AuthActions.LoggedIn) {
        context.patchState({user: action.user});
    /*    this._zone.run(() => {
            console.log('loginPage: authNavigate');
            this._router.navigate(['/content']);
        });*/
    }

    @Action(AuthActions.Logout)
    async logout(context: StateContext<IAuthStateModel>) {
        await this._authService.logout('lisahampel');
        return context.dispatch(new AuthActions.LoggedOut());
    }

}
