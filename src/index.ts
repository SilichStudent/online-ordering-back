import { App } from "./App";
import connection from "./services/DBConnectionService";
import * as dotenv from 'dotenv'

dotenv.load();

const port = process.env.PORT || 3000;

const appObj = new App();
let serverApp = appObj.app;

const appInstallPromise: Promise<void> = connection
  .then(c => {
    appObj.mountRoutes();
    appObj.addErrorHandler();

    serverApp.listen(port, (err: Error) => {

      if (err) {
        console.error(err.message || err);
        process.exit(10);
      }

      return console.log(`server is listening on ${port}`);
    });
  })
  .catch((e: Error) => {
    console.error(e.stack);
  });

module.exports = {
  serverApp,
  appInstallPromise
};
