import { sns } from '../aws'
import config from 'config'
import logger from "../util/logger";

const pushSnsNotification = async (message: string) => {
    const params = {
        Message: JSON.stringify(message),
        TopicArn: config.get<string>('snsTopicArn'),
    }

    sns.publish(params, (err, data) => {
        if (err) {
            logger.error(`error while sending sns notification to ${config.get<string>('snsTopicArn')}: ${err}`)
        } else {
            logger.info(`sns notification succsefully sent to the topic: to ${config.get<string>('snsTopicArn')}`)
        }
    });
}

export default pushSnsNotification;