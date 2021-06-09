import { Request, Response, Router } from 'express';
const router: Router = Router();
import { SampleService } from '../service';
import { SampleRepository } from '../repository';

const userService = new SampleService(new SampleRepository());
router.get('/', async (req: Request, res: Response) => {
    return res.status(200).json({
        message: 'pong',
        data: await userService.getAllUsers()
    });
});
export = router;
