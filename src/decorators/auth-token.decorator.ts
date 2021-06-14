import { Request, Response } from 'express';

export function verifyAuth(options: any) {
    return (_: any, __: PropertyKey, descriptor: TypedPropertyDescriptor<any>) => {
        const originalFunc = descriptor.value;

        descriptor.value = function () {
            const req: Request = arguments[0];
            const res: Response = arguments[1];

            let userId = '';
            try {
                const authorizationHeaders = req.headers.authorization;
                const headerSplit = authorizationHeaders!.split('Bearer');
                if (headerSplit.length === 2) {
                    // verify the token here
                    userId = options.userId;
                    req.body.userId = userId;
                    return originalFunc.apply(this, [req, res]);
                }
            } catch (error) {}

            const resonseObject = {
                error: 'Unauthorized',
                status: 400
            };
            return resonseObject;
        };
        return descriptor;
    };
}
