// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// const ClientOAuth2 = require('client-oauth2');


export const environment = {
    atlassian: {
        clientId: 'QLT8Ng5om30Gb6UBPTdL3sdxSDK5gWrx',
        clientSecret: 'DrS7wzuLyt0jWz8NHGZ0UecA9lqwG7vvmGO7TfzoIriUuwVZ7J4iOv78dXerBgS_',
        redirectUri: 'https://fmankodjpohicmamdpjdcljoeiiddhmj.chromiumapp.org/callback',
        scopes: ['notifications', 'gist', 'write:jira-work', 'read:jira-user'],
        apiToken: 'VQoL1nPsBGbVviwCF5gxA27C'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
