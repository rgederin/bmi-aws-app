import express from 'express'
import config from 'config'
import logger from './util/logger'
import routes from './routes'
import * as dynamoose from "dynamoose";

const port = config.get<number>('port')

const app = express();
app.use(express.json());

app.listen(port, async () => {
    logger.info(`app is running at http://localhost:${port}`)

    dynamoose.aws.sdk.config.update({
        "accessKeyId": "AKID",
        "secretAccessKey": "SECRET",
        "region": "us-east-1"
    });
    const dynamoDb = dynamoose.aws.ddb.local();

    routes(app)
}) 