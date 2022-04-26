import express from 'express'
import config from 'config'
import routes from './routes'
import logger from './util/logger'


const port = config.get<number>('port')

const app = express();
app.use(express.json());

app.listen(port, async () => {

    //setInterval(() => pushSnsNotification(`bmi-api service running on ${awsPublicIp} instance is alive`), 5 * 60 * 1000);

    routes(app);

    logger.info(`app is running at http://localhost:${port}`)
})