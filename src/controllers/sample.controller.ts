import { Request, Response, Router } from 'express';
const router: Router = Router();


router.get('/', async (req: Request, res: Response) => {
    return res.status(200).json({
        message: 'pong',
    });
});

router.post('/add', async (req: Request, res: Response) => {
    return res.status(200).json({
        message: 'pong',
    });
});
export = router;
