import { Component, OnInit } from '@angular/core';
import {IssueService} from '../../services/issue.service';
import {IssueFacade} from '../../redux/issue/issue.facade';
import {AuthFacade} from '../../redux/auth/auth.facade';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

    constructor(private extensionService: IssueService, private readonly _issueFacade: IssueFacade, private readonly _authFacade: AuthFacade) {
    }

    ngOnInit() {
    }

    sendBug() {
        this.extensionService.sendBug();
    }

    onLogoutButtonClicked() {
        this._authFacade.logout();
    }


    onTakeScreenshotButtonClicked() {
        this._issueFacade.takeScreenshot();
    }

}
