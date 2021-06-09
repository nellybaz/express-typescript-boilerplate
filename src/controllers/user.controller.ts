import { Request, Response, Router } from "express";
import { UserRepositry } from "../repository/user.repository";
import { UserServivce } from "../services";
const router: Router = Router();

const userService = new UserServivce(new UserRepositry());
router.post("/login", async (req: Request, res: Response) => {
    return res.status(200).json({
        message: "Login successfull",
        data: await userService.userLogin(req.body)
    });
});

export = router;
