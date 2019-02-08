import * as express from 'express'
import { Routes } from './Routes'

export class App {
  public app

  constructor () {
    this.app = express()
  }

  public mountRoutes (): void {
    this.app.use('/api/v1/', new Routes().routes);
  }
}