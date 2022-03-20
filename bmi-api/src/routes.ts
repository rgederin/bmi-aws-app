import { Express, Request, Response } from "express";
import { BmiRepository } from "./dynamodb/BmiRepository";
const routes = (app: Express) => {

    const bmiRepository = new BmiRepository()

    app.get('/health', (req: Request, res: Response) => res.sendStatus(200))

    app.post('/bmi', (req: Request, res: Response) => {
        bmiRepository.addBmiItem({ Id: 2, Ip: '123.3.3.2', Weight: 20, Height: 23 });
        res.sendStatus(200)
    })

    app.get('/bmi', async (req: Request, res: Response) => {
        const item = await bmiRepository.getBmiById(2);
        console.log(item);
        res.sendStatus(200)
    })

};

export default routes;