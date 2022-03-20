import * as dynamoose from 'dynamoose';

export const BmiSchema = new dynamoose.Schema({
    Id: {
        type: Number,
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

