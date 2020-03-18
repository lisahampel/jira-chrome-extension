import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginPage} from './login/login.page';
import {MatButtonModule} from '@angular/material';
import { CallbackComponent } from './callback/callback.component';

@NgModule({
    imports: [
        CommonModule,

        MatButtonModule
    ],
    declarations: [LoginPage, CallbackComponent]
})
export class AuthModule {
}
