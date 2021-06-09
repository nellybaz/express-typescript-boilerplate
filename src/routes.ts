import { Application } from "express";
import SampleController from './controller/sample.controller';
import UserController from './controller/users.controller';

export default class Routes{
  _app:Application
  constructor(app:Application){
    this._app = app
  }

  load(){
    this._app.use('/api/sample', SampleController);
    this._app.use('/users', UserController);
  }
}