import * as dynamoose from 'dynamoose';
import { Model } from 'dynamoose/dist/Model';
import { BmiModel } from '../types/bmi.dynamodb.model';
import { bmiDynamodbSchema } from './bmi.dynamodb.schema';
import { BmiItem } from '../types/bmi.dynamodb.item'
import config from 'config'


export class BmiRepository {
    private dynamoInstance: Model<BmiModel>;

    constructor() {
        const env = process.env.NODE_ENV;
        const modelOptions = {
            create: true
        };

        if (env === 'production' || env === 'staging') {
            modelOptions.create = false
        }

        this.dynamoInstance = dynamoose.model<BmiModel>(config.get('dynamodbTable'), bmiDynamodbSchema, modelOptions);
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