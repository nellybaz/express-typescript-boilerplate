import { Request, Response, Router } from 'express';
const router: Router = Router();
import {UserService} from '../service'
import {UserRepository} from '../repository'


const userService = new UserService(new UserRepository())
router.get('/', async (req: Request, res: Response) => {
    return res.status(200).json({
        message: 'pong',
        data: await userService.getAllUsers()
    });
});
export = router