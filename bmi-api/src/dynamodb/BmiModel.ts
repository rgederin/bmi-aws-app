import { Document } from 'dynamoose/dist/Document';

export class BmiModel extends Document {
    Id = 0;
    Ip = '';
    Weight = 0;
    Height = 0
}