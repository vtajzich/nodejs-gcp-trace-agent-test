import {logger} from "./logger";

const got = require('got');
const DISCOVERY_URL = 'https://www.googleapis.com/discovery/v1/apis';

export class NameService {

    async getNames(): Promise<[string]> {

        logger.info(`Going to get names...`);

        const {body} = await got(DISCOVERY_URL, {json: true});

        logger.info(`Names got, mapping ... `);

        const names = body.items.map((item: any) => item.name);

        logger.info(`Returning names...`);

        return names;
    }
}
