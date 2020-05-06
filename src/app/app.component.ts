import {Component, ViewEncapsulation} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'c-root'
  }
})
export class AppComponent {
  title = 'jira-issue';

  constructor(router: Router) {
      chrome.identity.onSignInChanged.addListener( (account, signedIn) => {
          if (signedIn) {
              console.log('AccountInfo - logged in: ', account, 'signedIn: ', signedIn);
              router.navigateByUrl('/content');
          } else {
              console.log('AccountInfo: ', account, 'signedIn: ', signedIn);
              router.navigateByUrl('/login');
          }
      });
  }
}
