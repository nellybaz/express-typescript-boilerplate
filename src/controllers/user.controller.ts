import { Request, Response, Router } from "express";
import { validateInput } from "../helpers/validator";
import { loginValidationSchema } from "../middlewares/validationSchema";
import { UserRepositry } from "../repository/user.repository";
import { UserServivce } from "../services";
const router: Router = Router();


const userService = new UserServivce(new UserRepositry());
router.post("/login", async (req: Request, res: Response) => {
    const result = await userService.userLogin(req.body);
    const {
        status, error, message, data, statusCode
    } = result;
    res.status(statusCode).json({ status, message, data, error });
});

router.post("/register", validateInput(loginValidationSchema), async (req: Request, res: Response) => {
    const result = await userService.userRegister(req.body);
    const {
        status, error, message, data, statusCode
    } = result;
    res.status(statusCode).json({status, message, data, error});
});

export = router;
