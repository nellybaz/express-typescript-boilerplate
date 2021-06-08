import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/ping', (req: Request, res: Response) => {
    return res.status(200).json({
        message: 'pong'
    });
});

export = router;
