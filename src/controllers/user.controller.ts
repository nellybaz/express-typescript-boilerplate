import { Request, Response, Router } from "express";
import logging from "../../config/logging";
import { UserRepositry } from "../repository/user.repository";
import { UserServivce } from "../services";
const router: Router = Router();
import Responses from "../utils/response";


const userService = new UserServivce(new UserRepositry());
router.post("/login", async (req: Request, res: Response) => {
    console.log(req.body);
    const result = await userService.userLogin(req.body);
    const {
        status, error, message, data, statusCode
    } = result;
    res.status(statusCode).json(Responses.successResponse(status, message, data, error));
});

export = router;
