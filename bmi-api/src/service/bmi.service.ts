import logger from "../util/logger";
import { BmiRepository } from "../dynamodb/bmi.repository";
import { BmiItem } from "../types/bmi.dynamodb.item";
import { BmiResponse } from "../types/bmi.response";
import sendBmiResult from "../sqs/sqs.sender"

const bmiRepository = new BmiRepository()

export const handleBmiCalculation = (id: string, weight: number, height: number): BmiResponse => {
    const bmiResult = calculateBmi(weight, height);

    logger.info(`bmi for request id ${id} = ${bmiResult.bmi}`)

    saveBmiItemInDynamodb({ id, weight, height }).then(() => {
        logger.info(`request ${id} saved in dynamodb`)
    }).catch((error) => {
        logger.info(`request id ${id} was not saved in dynamodb: ${error}`)
    });

    bmiResult.id = id;

    sendBmiResult(bmiResult);

    return bmiResult;
}

const calculateBmi = (weight: number, height: number): BmiResponse => {
    const index = (weight / (height * height));

    let result: string;

    if (index < 18.5) {
        result = "under weight";
    }

    else if (index >= 18.5 && index <= 24.9) {
        result = "normal weight";
    }

    else if (index > 24.9 && index <= 29.9) {
        result = "over weight";
    }
    else {
        result = "obesity";
    }

    return {
        bmi: index,
        result: result
    }
}

const saveBmiItemInDynamodb = async (bmi: BmiItem): Promise<void> => {
    try {
        bmiRepository.createBmiEntry(bmi);
    } catch (e: any) {
        throw new Error(e);
    }
}