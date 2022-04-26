import aws from 'aws-sdk'
import config from 'config'

aws.config.update({
    region: config.get<string>('region');
});

export const sqs = new aws.SQS();
export const sns = new aws.SNS();