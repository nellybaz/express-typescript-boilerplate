import { Request, Response } from 'express';

export function authorize(options: any) {
    return (_: any, __: PropertyKey, descriptor: TypedPropertyDescriptor<any>) => {
        const originalFunc = descriptor.value;

        descriptor.value = function () {
            const req: Request = arguments[0];
            const res: Response = arguments[1];
           
            try {
              /**IDOR
               * get collection name and userId
               * check if userId has right on the resource
               */
               let userId = req.body.userId;
                if (true) {
                    return originalFunc.apply(this, [req, res]);
                }
            } catch (error) {}

            const responseObject = {
                error: 'Unauthorized',
                status: 401
            };
            return res.status(401).json(responseObject);
        };
        return descriptor;
    };
}
