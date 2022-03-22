import { v4 as uuidv4 } from 'uuid';
import { BmiRepository } from "../dynamodb/bmi.repository";
import { BmiItem } from "../types/bmi.dynamodb.item";
import { BmiResponse } from "../types/bmi.response";
const bmiRepository = new BmiRepository()

export const handleBmiCalculation = (weight: number, height: number): BmiResponse => {
    const bmiResult = calculateBmi(weight, height);

    const bmiItem = {
        id: uuidv4(),
        weight: weight,
        height: height
    }
    saveBmiItemInDynamodb(bmiItem);

    return bmiResult;
}

const calculateBmi = (weight: number, height: number) => {
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