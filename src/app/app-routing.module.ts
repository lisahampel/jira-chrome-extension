import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPage} from './pages/auth/login/login.page';
import {ExtensionComponent} from './components/extension/extension.component';
import {AuthGuard} from './guards/auth.guard';
import {CallbackComponent} from './pages/auth/callback/callback.component';


const routes: Routes = [
    {
        path: 'login',
        component: LoginPage
    },
    {
        path: 'callback',
        component: CallbackComponent
    },
    {
        path: 'content',
        component: ExtensionComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '',
        redirectTo: 'content',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
