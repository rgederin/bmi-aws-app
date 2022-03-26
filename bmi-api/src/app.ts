import express from 'express'
import config from 'config'
import logger from './util/logger'
import routes from './routes'
import setupDynamodb from './dynamodb/dynamodb.setup'

const port = config.get<number>('port')

const app = express();
app.use(express.json());

app.listen(port, async () => {
    setupDynamodb();
    routes(app);

    logger.info(`app is running at http://localhost:${port}`)
}) 