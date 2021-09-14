import { Request, Response, NextFunction } from 'express';

const user = true;

export const isUser = (req: Request, res: Response, next: NextFunction) => {

    if(user){
        next();
    }

    else {
        res.status(401).json({
            msg: 'No estas autorizado',
        });
    }
};