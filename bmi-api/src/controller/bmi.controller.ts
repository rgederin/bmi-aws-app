import { Request, Response } from "express";
import { handleBmiCalculation } from "../service/bmi.service";
import { BmiRequest } from "../types/bmi.request";
import { BmiResponse } from "../types/bmi.response";


export const calculateBmiHandler = (req: Request<{}, {}, BmiRequest['body']>, res: Response): Response<BmiResponse> => {
    try {
        const bmi = handleBmiCalculation(req.body.weight, req.body.height);

        return res.status(200).send(bmi);
    } catch (e: any) {
        return res.status(409).send(e.message)
    }
}