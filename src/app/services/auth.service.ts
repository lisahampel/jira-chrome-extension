import * as ClientOAuth2 from 'client-oauth2';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() {}

    async login() {
        // console.log('AuthService.login', arguments);
        const atlassianAuthUrl = await this._getAtlassianAuthUrl();
        return new Promise((resolve) => {
            chrome.identity.launchWebAuthFlow({
                url: atlassianAuthUrl,
                interactive: true
            }, resolve);
        });
    }

    private async _getAtlassianAuthUrl(): Promise<string> {
        // console.log('AuthService._getAtlassianAuthUrl', arguments);
        const userInfo = await this._getProfileUserInfo();
        console.log('userInfo', userInfo);
        // this._store.dispatch(new AppActions.GetUserInformation());
        return `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=QLT8Ng5om30Gb6UBPTdL3sdxSDK5gWrx&scope=read%3Aservicedesk-request%20write%3Aservicedesk-request&redirect_uri=https%3A%2F%2Fnmeoeehnncogeoalaabeoildfopkhgll.chromiumapp.org%2Fcallback&state=${userInfo.id}&response_type=code&prompt=consent`;
    }

    private _getProfileUserInfo(): Promise<any> {
        // console.log('AuthService._getProfileUserInfo', arguments);
        return new Promise((resolve) => {
            chrome.identity.getProfileUserInfo(resolve);
        });
    }

}
