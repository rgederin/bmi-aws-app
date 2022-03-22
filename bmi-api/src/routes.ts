import { Express, Request, Response } from "express";
import { calculateBmiHandler } from "./controller/bmi.controller";
import { validate } from "./middleware/validateResource";
import { bmiRequestSchema } from "./schema/bmi.request.schema";
const routes = (app: Express) => {


    app.get('/health', (req: Request, res: Response) => res.sendStatus(200))

    app.post('/bmi', validate(bmiRequestSchema), calculateBmiHandler)

    // app.get('/bmi', async (req: Request, res: Response) => {
    //     const item = await bmiRepository.getBmiById(2);
    //     console.log(item);
    //     res.sendStatus(200)
    // })

};

export default routes;