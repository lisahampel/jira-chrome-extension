import * as ClientOAuth2 from 'client-oauth2';
import {environment} from '../../environments/environment';

export class AuthService {

    constructor() {
        const auth = new ClientOAuth2(environment.atlassian);
        // auth.

    }
}
