import { Application } from "express";
import SampleController from './controller/sample.controller';
export default class Routes{
  _app:Application
  constructor(app:Application){
    this._app = app
  }

  load(){
    this._app.use('/api/sample', SampleController);
  }
}