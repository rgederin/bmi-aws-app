export default {
    port: 1337,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    sqsUrl: process.env.SQS_URL,
    snsTopicArn: 'arn:aws:sns:us-west-2:530260462866:test-sns-topic'

    //process.env.SNS_TOPIC_ARN
};