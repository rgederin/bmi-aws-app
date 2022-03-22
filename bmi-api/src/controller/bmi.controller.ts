import { Request, Response } from "express";
import { handleBmi } from "../service/bmi.service";
import { BmiInput } from "../schema/bmi.request.schema";


export const calculateBmiHandler = async (req: Request<{}, {}, BmiInput['body']>, res: Response) => {
    try {
        console.log('calc bmi handler')

        console.log(req.body);
        const bmi = handleBmi(req.body);
        return res.status(200).send(bmi);
    } catch (e: any) {
        return res.status(409).send(e.message)
    }
}