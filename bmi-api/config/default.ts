export default {
    port: 1337,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    dynamodbTable: process.env.DYNAMODB_TABLE,
    sqsUrl: process.env.SQS_URL,
    snsTopicArn: process.env.TOPIC_URL
};