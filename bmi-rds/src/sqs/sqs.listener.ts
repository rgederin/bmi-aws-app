import { sqs } from '../aws';
import config from 'config';
import logger from "../util/logger";
import { SQS } from 'aws-sdk';


const processSqsMessages = () => {
    // Setup the receiveMessage parameters
    const params = {
        QueueUrl: config.get<string>('sqsUrl'),
        MaxNumberOfMessages: 10,
        VisibilityTimeout: 0,
        WaitTimeSeconds: 0
    };

    sqs.receiveMessage(params, (err, data: SQS.ReceiveMessageResult) => {
        if (err) {
            console.log(err, err.stack);
        } else {
            if (!data.Messages) {
                console.log('Nothing to process');
                return;
            }

            logger.info(`receive ${data.Messages.length}`);


            for (let message in data.Messages) {
                logger.info(message);
            }

        }
    })

}
