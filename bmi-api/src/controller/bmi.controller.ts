import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { handleBmiCalculation } from "../service/bmi.service";
import { BmiRequest } from "../types/bmi.request";
import { BmiResponse } from "../types/bmi.response";
import logger from "../util/logger";

export const calculateBmiHandler = (req: Request<{}, {}, BmiRequest['body']>, res: Response): Response<BmiResponse> => {
    try {
        const id = uuidv4();
        const height = req.body.height;
        const weight = req.body.weight;

        logger.info(`bmi request id: ${id},  height: ${height}, weight: ${weight}`)

        const bmi = handleBmiCalculation(id, weight, height);

        return res.status(200).send(bmi);
    } catch (e: any) {
        return res.status(409).send(e.message)
    }
}