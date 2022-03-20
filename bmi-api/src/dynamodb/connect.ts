import * as dynamoose from "dynamoose";

const dynamoDb = dynamoose.aws.ddb.local();

export default dynamoDb;