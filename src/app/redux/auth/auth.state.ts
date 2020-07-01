import { Location } from '@angular/common';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthService } from '../../services/auth.service';
import { AuthActions } from './auth.actions';

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

    @Action(AuthActions.SilentLogin)
    async silentLogin(context: StateContext<IAuthStateModel>) {
        const accessToken = await this._authService.silentLogin();

        if (accessToken != null) {
            const user = await this._authService.getActiveUser(accessToken);
            const issues = await this._authService.getImacsIssue(accessToken, 'assignee="Lisa Hampel"');
            console.log('@Action SilentLogin user: ', user);
            console.log('@Action SilentLogin issues: ', issues);
            return context.dispatch(new AuthActions.LoggedIn(user));
        }
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
        context.patchState({ user: action.user });
        this._zone.run(() => {
            this._router.navigate(['/content']);
        });
    }

    @Action(AuthActions.Logout)
    async logout(context: StateContext<IAuthStateModel>) {
        const accessToken = await this._authService.silentLogin();

        await this._authService.logout(accessToken);
        this._zone.run(() => {
            this._router.navigate(['/login']);
        });
        return context.dispatch(new AuthActions.LoggedOut());
    }

}
