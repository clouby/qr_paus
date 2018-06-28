// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  url_api: 'http://localhost:4400/api',
  root_tree: "/Zones",
  firebase: {
    apiKey: "AIzaSyAeD6K3wiFuH0qCoNebOL8AzePO67lWhsA",
    authDomain: "qrpaus.firebaseapp.com",
    databaseURL: "https://qrpaus.firebaseio.com",
    projectId: "qrpaus",
    storageBucket: "qrpaus.appspot.com",
    messagingSenderId: "127879409458"
  }
};
