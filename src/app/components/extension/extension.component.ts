import { Component, OnInit } from '@angular/core';
import {ExtensionService} from '../../services/extension.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-extension',
  templateUrl: './extension.component.html',
  styleUrls: ['./extension.component.scss']
})

export class ExtensionComponent implements OnInit {

    constructor(private extensionService: ExtensionService) {
    }

    ngOnInit() {
    }

    sendBug() {
        this.extensionService.sendBug();
    }


    takeScreenshot() {
        console.log('takeScreenshot clicked');
        // chrome.browserAction.onClicked.addListener(() => {
        chrome.tabs.captureVisibleTab((screenshotUrl) => {
                const link = document.createElement('a');
                link.download = 'screenshot.png';
                link.href = screenshotUrl;
                link.click();
            });
        // });
    }

}
