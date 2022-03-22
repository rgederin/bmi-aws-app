import * as dynamoose from 'dynamoose';
import { Model } from 'dynamoose/dist/Model';
import { Document } from 'dynamoose/dist/Document';

export interface BmiItem {
    id: string,
    ip: string,
    weight: number,
    height: number
};

class BmiModel extends Document {
    Id = '';
    Ip = '';
    Weight = 0;
    Height = 0
}

const bmiDynamodbSchema = new dynamoose.Schema({
    Id: {
        type: String,
        hashKey: true,
        required: true
    },
    Ip: {
        type: String,
        required: true
    },
    Weight: {
        type: Number,
        required: true
    },
    Height: {
        type: Number,
        required: true
    }
}, {
    "timestamps": true
});


export class BmiRepository {
    private dynamoInstance: Model<BmiModel>;

    constructor() {
        this.dynamoInstance = dynamoose.model<BmiModel>('bmi-table', bmiDynamodbSchema);
    }

    createBmiEntry = async (bmiItem: BmiItem) => {
        this.dynamoInstance.create({
            Id: bmiItem.id,
            Ip: bmiItem.ip,
            Weight: bmiItem.weight,
            Height: bmiItem.height
        });
    };

    getBmiById = async (id: number) => {
        return this.dynamoInstance.get({ Id: id });
    };
}

// import * as dynamoose from 'dynamoose';
// import { ExampleModel } from './ExampleModel';
// import { getTableName } from '@amagroup.io/amag-corelib';
// 
// import { ExampleSchema } from './ExampleSchema';
// import { CreateExampleRequest } from './create-survey/CreateSurveyRequest';
// import { UpdateExampleRequest } from './update-survey/UpdateSurveyRequest';

// export default class ExampleRepository {

//     private dbInstance: Model<ExampleModel>;

//     constructor(environment: string) {
//         const tableName = getTableName(environment, 'Example');
//         this.dbInstance = dynamoose.model<ExampleModel>(tableName, ExampleSchema);
//     }



//     updateExample = async (request: UpdateExampleRequest) => {
//         return await this.dbInstance.update({
//             Id: request.Id,
//             Module: request.Module,
//             Description: request.Description
//         });
//     };

//     getExampleById = async (id: string, moduleName: string) => {
//         return await this.dbInstance.get({ Id: id, Module: moduleName });
//     };
// }