import {logger} from "./logger";

const got = require('got');
const DISCOVERY_URL = 'https://www.googleapis.com/discovery/v1/apis';

export class NameService {

    async getNames(): Promise<[string]> {

        logger.info(`2. Going to get names...`);

        const {body} = await got(DISCOVERY_URL, {json: true});

        logger.info(`3. Names got, mapping ... `);

        const names = body.items.map((item: any) => item.name);

        logger.info(`4. Returning names...`);

        return names;
    }
}
