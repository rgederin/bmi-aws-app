import * as aws from 'aws-sdk'
import { BmiResponse } from '../types/bmi.response';

aws.config.update({ region: 'us-west-2' });

export const sendBmiResultInSqs = (bmiResult: BmiResponse) => {
    var sqs = new aws.SQS({ apiVersion: '2012-11-05' });

    var params = {
        DelaySeconds: 10,
        MessageAttributes: {
            "request_id": {
                DataType: "String",
                StringValue: bmiResult.id
            },
            "bmi_index": {
                DataType: "String",
                StringValue: bmiResult.bmi.toString()
            },
            "result": {
                DataType: "String",
                StringValue: bmiResult.result
            }
        },
        MessageBody: `bmi calculation result for ${bmiResult.id}`,

        QueueUrl: "https://sqs.us-west-2.amazonaws.com/530260462866/test-sqs"
    };

    sqs.sendMessage(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.MessageId);
        }
    });
}

