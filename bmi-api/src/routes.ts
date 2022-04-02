import { Express, Request, Response } from "express";
import { calculateBmiHandler } from "./controller/bmi.controller";
import { validate } from "./middleware/validateResource";
import { bmiRequestSchema } from "./types/bmi.request";

const routes = (app: Express) => {
    app.get('/health', (req: Request, res: Response) => res.sendStatus(200))
    app.post('/bmi', validate(bmiRequestSchema), calculateBmiHandler)
};

export default routes;