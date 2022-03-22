import { Request, Response, NextFunction } from "express"
import { AnyZodObject } from 'zod'

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body
        });
        next();
    } catch (e: any) {
        return res.status(400).send(e.errors);
    }
}

