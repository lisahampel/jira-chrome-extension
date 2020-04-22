import {Component, NgZone, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';
import LoggedIn = AppActions.LoggedIn;
import {Store} from '@ngxs/store';
import {AppActions} from '../../../actions/app.actions';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

    static ATLASSIAN_AUTH_URL = 'https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=QLT8Ng5om30Gb6UBPTdL3sdxSDK5gWrx&scope=read%3Aservicedesk-request%20write%3Aservicedesk-request&redirect_uri=https%3A%2F%2Fnmeoeehnncogeoalaabeoildfopkhgll.chromiumapp.org%2Fcallback&state=${YOUR_USER_BOUND_VALUE}&response_type=code&prompt=consent';

    constructor(private _router: Router, private _zone: NgZone, private _store: Store) {
    }

    get atlassianAuthUrlOld() {
        const { atlassian } = environment;

        const url = new URL('https://auth.atlassian.com/authorize');
        url.searchParams.set('audience', 'api.atlassian.com');
        url.searchParams.set('client_id', 'atlassian.clientId');
        url.searchParams.set('scope', atlassian.scopes.join('%20'));
        url.searchParams.set('redirect_uri', atlassian.redirectUri);
        // url.searchParams.set('state', '');
        url.searchParams.set('response_type', 'code');
        url.searchParams.set('prompt', 'consent');

        const redirectUrl = chrome.identity.getRedirectURL('callback');

        console.log('redirectUrl', redirectUrl);
        // return url.href;
        return `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=${encodeURIComponent(atlassian.clientId)}&scope=${encodeURIComponent(atlassian.scopes.join('%20'))}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code&prompt=consent`;
    }


    ngOnInit() {
    }

    getProfileUserInfo(): Promise<any> {
        return new Promise((resolve) => {
            chrome.identity.getProfileUserInfo(resolve);
        });
    }

    async getAtlassianAuthUrl(): Promise<string> {
        const userInfo = await this.getProfileUserInfo();
        console.log('userInfo', userInfo);
        this._store.dispatch(new AppActions.GetUserInformation());
        return `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=QLT8Ng5om30Gb6UBPTdL3sdxSDK5gWrx&scope=read%3Aservicedesk-request%20write%3Aservicedesk-request&redirect_uri=https%3A%2F%2Fnmeoeehnncogeoalaabeoildfopkhgll.chromiumapp.org%2Fcallback&state=${userInfo.id}&response_type=code&prompt=consent`;
    }

    async login() {
        chrome.identity.launchWebAuthFlow({
            url: await this.getAtlassianAuthUrl(),
            interactive: true
        }, () => {
            this._zone.run(() => {
                console.log('authNavigate');
                this._router.navigate(['/content']);
            });
            console.log('auth successful', arguments);
        });
        this._store.dispatch(new AppActions.LoggedIn());
    }
}
