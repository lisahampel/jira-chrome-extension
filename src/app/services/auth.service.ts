import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { BackgroundService } from './background.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private readonly _backgroundService: BackgroundService,
                private readonly _httpClient: HttpClient) {
    }

    async login() {
        // console.log('AuthService.login', arguments);
        const atlassianAuthUrl = await this._getAtlassianAuthUrl().catch(e => {
            console.error('authservice.Login', e);
            return null;
        });
        console.log('authservice.Login atlassianAuthUrl', atlassianAuthUrl);
        /*return new Promise((resolve) => {
            chrome.identity.launchWebAuthFlow({
                url: atlassianAuthUrl,
                interactive: true
            }, resolve);
        })*/
        return this._backgroundService.startWebAuthFlow({
            url: atlassianAuthUrl,
            interactive: true
        }).then((redirectUrl: string) => {
            console.log('authservice.Login redirectUrl', redirectUrl);
            const url = new URL(redirectUrl);
            return this.getAccessToken(url.searchParams.get('code'));
        }).then((accessToken: string) => {
            console.log('authservice.Login accessToken', accessToken);
            return accessToken;
        }).catch(e => {
            console.error('authservice.Login2', e);
            return null;
        });
    }

    async loginNew() {
        // console.log('AuthService.login', arguments);
        const atlassianAuthUrl = await this._getAtlassianAuthUrl().catch(e => {
            console.error('authservice.Login', e);
            return null;
        });
        console.log('authservice.Login atlassianAuthUrl', atlassianAuthUrl);
        return new Promise((resolve) => {
            chrome.identity.getAuthToken({
                interactive: true
            }, resolve);
        }).then((redirectUrl: string) => {
            console.log('authservice.Login redirectUrl', redirectUrl);
            const url = new URL(redirectUrl);
            return this.getAccessToken(url.searchParams.get('code'));
        }).then((accessToken: string) => {
            console.log('authservice.Login accessToken', accessToken);
            return accessToken;
        }).catch(e => {
            console.error('authservice.Login2', e);
            return null;
        });
    }

    private async _getAtlassianAuthUrl(): Promise<string> {
        // console.log('AuthService._getAtlassianAuthUrl', arguments);
        // const userInfo = await this._getProfileUserInfo();
        const redirectUrl = chrome.identity.getRedirectURL('callback');
        const url = 'https://auth.atlassian.com/authorize' +
            '?audience=api.atlassian.com' +
            '&client_id=' + environment.atlassian.clientId +
            '&scope=' + encodeURIComponent(environment.atlassian.scopes.join(' ')) +
            '&redirect_uri=' + encodeURIComponent(redirectUrl) +
            '&state=lisa' +
            '&response_type=code' +
            '&prompt=consent';
        // console.log('userInfo', userInfo, await this._getAuthToken());
        // this._store.dispatch(new AppActions.GetUserInformation());
        return url;
        // return `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=QLT8Ng5om30Gb6UBPTdL3sdxSDK5gWrx&scope=read%3Aservicedesk-request%20write%3Aservicedesk-request&redirect_uri=https%3A%2F%2Fnmeoeehnncogeoalaabeoildfopkhgll.chromiumapp.org%2Fcallback&state=${userInfo.id}&response_type=code&prompt=consent`;
    }

    private _getProfileUserInfo(): Promise<any> {
        // console.log('AuthService._getProfileUserInfo', arguments);
        return new Promise((resolve) => {
            chrome.identity.getProfileUserInfo(resolve);
        });
    }

    private _getAuthToken(): Promise<any> {
        return new Promise((resolve) => {
            chrome.identity.getAuthToken({}, resolve);
        });
    }

    /*    curl --request POST \
    --url 'https://auth.atlassian.com/oauth/token' \
    --header 'Content-Type: application/json' \
    --data '{"grant_type": "authorization_code","client_id": "YOUR_CLIENT_ID","client_secret": "YOUR_CLIENT_SECRET","code": "YOUR_AUTHORIZATION_CODE","redirect_uri": "https://YOUR_APP_CALLBACK_URL"}'*/

    getAccessToken(authorizationCode: string): Promise<string> {
        return this._httpClient.post('https://auth.atlassian.com/oauth/token', {
            'grant_type': 'authorization_code',
            'client_id': environment.atlassian.clientId,
            'client_secret': environment.atlassian.clientSecret,
            'code': authorizationCode,
            'redirect_uri': environment.atlassian.redirectUri
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).toPromise().then((result: any) => result.access_token);
    }

    getActiveUser(accessToken: string) {
        return this._httpClient.get('https://api.atlassian.com/me',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: 'application/json'
                }
            }).toPromise();
    }

    getImacsIssue(accessToken: string, jql: string) {
        return this._httpClient.get(`https://bynary.atlassian.net/rest/api/3/search?jql=${encodeURIComponent(jql)}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }).toPromise();
    }

    async logout(accessToken) {
        chrome.identity.removeCachedAuthToken(accessToken, () => {
            console.log('logged out');
        });
    }

}
