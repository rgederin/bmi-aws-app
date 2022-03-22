import * as dynamoose from 'dynamoose';
import { Model } from 'dynamoose/dist/Model';
import { BmiModel } from '../types/bmi.dynamodb.model';
import { bmiDynamodbSchema } from './bmi.dynamodb.schema';
import { BmiItem } from '../types/bmi.dynamodb.item'

export class BmiRepository {
    private dynamoInstance: Model<BmiModel>;

    constructor() {
        this.dynamoInstance = dynamoose.model<BmiModel>('bmi-table', bmiDynamodbSchema);
    }

    createBmiEntry = (bmiItem: BmiItem) => {
        this.dynamoInstance.create({
            Id: bmiItem.id,
            Weight: bmiItem.weight,
            Height: bmiItem.height
        });
    };

    getBmiById = async (id: number) => {
        return this.dynamoInstance.get({ Id: id });
    };
};