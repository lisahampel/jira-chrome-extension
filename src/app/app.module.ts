import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {IssueComponent} from './components/issue/issue.component';
import {QuillModule} from 'ngx-quill';
import {CommonModule} from '@angular/common';
import {AuthModule} from './pages/auth/auth.module';
import {RouterModule} from '@angular/router';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {NgxsModule} from '@ngxs/store';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {AuthState} from './redux/auth/auth.state';
import {HttpClientModule} from '@angular/common/http';
import {IssueState} from './redux/issue/issue.state';


@NgModule({
    declarations: [
        AppComponent,
        IssueComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        CommonModule,
        AngularEditorModule,
        HttpClientModule,
     /*   QuillModule.forRoot({
            modules: {
                syntax: false,
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    ['blockquote', 'code-block'],

                    [{'header': 1}, {'header': 2}],               // custom button values
                    [{'list': 'ordered'}, {'list': 'bullet'}],
                    // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                    // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                    // [{ 'direction': 'rtl' }],                         // text direction

                    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
                    [{'header': [1, 2, 3, 4, 5, 6, false]}],

                    // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                    [{'font': []}],
                    [{'align': []}],

                    // ['clean'],                                         // remove formatting button

                    ['link', 'image', 'video']                         // link and image, video
                ]
            }
        }),*/
        AuthModule,
        NgxsModule.forRoot([AuthState, IssueState], {
            developmentMode: true
        }),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsLoggerPluginModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}
