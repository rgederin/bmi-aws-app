import * as dynamoose from 'dynamoose';

export const bmiDynamodbSchema = new dynamoose.Schema({
    Id: {
        type: String,
        hashKey: true,
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