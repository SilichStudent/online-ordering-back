import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Routes } from './Routes'

export class App {
  public app : express.Express;

  constructor () {
    this.app = express();
    this.app.use(bodyParser.json());
  }

  public mountRoutes (): void {
    this.app.use('/api/v1/', new Routes().routes);
  }
}