import { sqs } from '../aws'
import { BmiResponse } from '../types/bmi.response';
import config from 'config'
import logger from "../util/logger";

const sendBmiMessage = async (bmiResult: BmiResponse): Promise<void> => {
    const params = {
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
        QueueUrl: config.get<string>('sqsUrl')
    };

    sqs.sendMessage(params, (err, data) => {
        if (err) {
            logger.error(`error while sending bmi message ${bmiResult.id} in sqs: ${err}`)
        } else {
            logger.info(`bmi message ${bmiResult.id} sent in sqs`)
        }
    });
};

export default sendBmiMessage;

