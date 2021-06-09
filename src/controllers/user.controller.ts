import { Request, Response, Router } from "express";
import logging from "../../config/logging";
import { UserRepositry } from "../repository/user.repository";
import { UserServivce } from "../services";
const router: Router = Router();
const Responses = require("../utils/response");

const userService = new UserServivce(new UserRepositry());
router.post("/login", async (req: Request, res: Response) => {
    const result = await userService.userLogin(req.body);
    logging.info("usercontroller", "hello", result)
    const {
        status, error, message, data
    } = result;
    res.status(result.statusCode).json(Responses.successResponse(status, message, data, error));
});

export = router;
