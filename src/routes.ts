import { Application } from "express";
import SampleController from './controllers/sample.controller';
import UserController from "./controllers/user.controller";
import { validateInput } from "./helpers/validator";
import { loginValidationSchema } from "./middlewares/validationSchema";
export default class Routes {
  _app: Application;
  constructor(app: Application,) {
    this._app = app;
  }

  load() {
    this._app.use('/api/sample', SampleController);
    this._app.use('/api/auth', validateInput(loginValidationSchema), UserController);
  }
}