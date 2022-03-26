import * as dynamoose from "dynamoose";
import config from 'config'
import logger from "../util/logger";

const setupDynamodb = (): void => {
    dynamoose.aws.sdk.config.update({
        'accessKeyId': config.get<string>('accessKeyId'),
        'secretAccessKey': config.get<string>('secretAccessKey'),
        'region': config.get<string>('region')
    });

    logger.info('dynamoose sdk is ready')

    const env = process.env.NODE_ENV;

    if (env !== 'production' && env !== 'staging') {
        dynamoose.aws.ddb.local();
        logger.info('using local dockerized local dynamodb')
    }
}

export default setupDynamodb;