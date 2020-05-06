import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthFacade} from '../redux/auth/auth.facade';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private readonly _router: Router, private readonly _authFacade: AuthFacade) {
    }

   async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        if (await this._authFacade.isLoggedIn) {
            return true;
        }
        return this._router.parseUrl('/login');
    }
}
