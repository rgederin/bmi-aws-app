import * as dynamoose from 'dynamoose';
import { Model } from 'dynamoose/dist/Model';
import { BmiModel } from './BmiModel';
import { BmiSchema } from './BmiSchema';
import { BmiItem } from './BmiItem'

export class BmiRepository {
    private dynamoInstance: Model<BmiModel>;

    constructor() {
        this.dynamoInstance = dynamoose.model<BmiModel>('bmi-table', BmiSchema);
    }

    addBmiItem = async (bmiItem: BmiItem) => {
        return await this.dynamoInstance.create({
            Id: bmiItem.Id,
            Ip: bmiItem.Ip,
            Weight: bmiItem.Weight,
            Height: bmiItem.Height
        });
    };

    getBmiById = async (id: number) => {
        return await this.dynamoInstance.get({ Id: id });
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