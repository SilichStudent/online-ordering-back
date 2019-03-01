import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Routes } from './Routes'
import * as cors from 'cors'
import { CustomError } from './errors/CustomError';

export class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(cors());
  }

  public mountRoutes(): void {
    this.app.use('/api/v1/', new Routes().routes);
  }

  public addErrorHandler(): void {
    this.app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
      if (err instanceof CustomError) {
        res.status(err.status);
      } else {
        res.status(500);
        console.error(err.stack);
      }
      

      return res.send({ message: err.message });
    });
  }
}