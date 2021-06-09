import { Request, Response, Router } from "express";
import { UserRepositry } from "../repository/user.repository";
import { UserServivce } from "../services";
const router: Router = Router();
// import Responses from "../utils/response";
// import { IResponse } from "../interfaces/response.interface";



const userService = new UserServivce(new UserRepositry());
router.post("/login", async (req: Request, res: Response) => {
    const result = await userService.userLogin(req.body);
    const {
        status, error, message, data, statusCode
    } = result;
    res.status(statusCode).json({ status, message, data, error });
});

router.post("/register", async (req: Request, res: Response) => {
    const result = await userService.userRegister(req.body);
    const {
        status, error, message, data, statusCode
    } = result;
    res.status(statusCode).json(Responses.successResponse(status, message, data, error));
});

export = router;
