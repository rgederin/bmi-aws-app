import { BmiRepository, BmiItem } from "../dynamodb/bmi.repository";

const bmiRepository = new BmiRepository()

export const handleBmi = (bmiItem: BmiItem) => {
    
    const bmiResult = calculateBmi(bmiItem.weight, bmiItem.height);

    createBmiEntry(bmiItem);

    return bmiResult;
}

const calculateBmi = (weight: number, height: number) => {
    const bmi = (weight / (height * height));

    let index: string;

    if (bmi < 18.5) {
        index = "under weight";
    }

    else if (bmi >= 18.5 && bmi <= 24.9) {
        index = "normal weight";
    }

    else if (bmi > 24.9 && bmi <= 29.9) {
        index = "over weight";
    }
    else {
        index = "obesity";
    }

    return {
        bmi: bmi,
        result: index
    }
}

const createBmiEntry = async (bmi: BmiItem): Promise<void> => {
    try {
        bmiRepository.createBmiEntry(bmi);
    } catch (e: any) {
        throw new Error(e);
    }
}