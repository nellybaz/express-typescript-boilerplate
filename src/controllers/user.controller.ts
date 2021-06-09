import { Request, Response, Router } from "express";
import { UserRepositry } from "../repository/user.repository";
import { UserServivce } from "../services";
const router: Router = Router();
const Responses = require("../utils/response");

const userService = new UserServivce(new UserRepositry());
router.post("/login", async (req: Request, res: Response) => {
    const result = await userService.userLogin(req.body);
    const {
        status, error, message, data
    } = result;
    // if (status) {
    res.status(201).json(Responses.successResponse(status, message, data, error));
    // } else {
    // res.status(error.status || 500).json(Responses.errorResponse(error));
    // }

    // return res.status(200).json({
    //     message: result.message,
    //     data: result
    // });
});

export = router;
