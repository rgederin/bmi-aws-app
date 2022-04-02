import express from 'express'
import config from 'config'
import logger from './util/logger'
import routes from './routes'
import setupDynamodb from './dynamodb/dynamodb.setup'
import pushSnsNotification from './sns/sns.sender'

const port = config.get<number>('port')

const app = express();
app.use(express.json());

app.listen(port, async () => {
    setupDynamodb();
    routes(app);

    pushSnsNotification('test');
    logger.info(`app is running at http://localhost:${port}`)
}) 