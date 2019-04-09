require('@google-cloud/trace-agent').start({
    projectId: process.env.LOGGING_PROJECT_ID,
    keyFilename: process.env.SA_LOGGING_FILE,
    flushDelaySeconds: 5,
    samplingRate: 0
});

import {logger} from './logger';
import express from "express";
import {NameService} from './service'

export const app = express();
const port = 3000;



const service = new NameService();

app.post('/', async (req, res) => {

    try {

        logger.info(`1. Received request`);

        const names = await service.getNames();

        logger.info('5. Got names, sending response');

        res.status(200)
            .send(names.join('\n'))
            .end();

    } catch (err) {
        logger.error(err);
        res.status(500)
            .end();
    }
});


export const server = app.listen(port, () => {
    logger.debug(`App is running at http://localhost:${port}`);
    logger.debug('Press CTRL-C to stop\n');
});
