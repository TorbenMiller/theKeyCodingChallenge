import axios from "axios";
import { postApiResponse } from "./types";
import { Parser } from "./Parser";
import EventEmitter from "node:events";

type FetcherConfig = {
    url: string;
    intervalMs: number;
};

export class Fetcher {
    private config: FetcherConfig;
    private emitter: EventEmitter;
    private parser: Parser;
    private fetchTimer: NodeJS.Timeout | null = null;

    constructor(config: FetcherConfig, parser: Parser, emitter: EventEmitter) {
        this.config = config;
        this.parser = parser;
        this.emitter = emitter;
    }

    private async fetch() {
        const result: postApiResponse = await axios.get(this.config.url);

        this.emitter.emit("newData", this.parser.parse(result.data));
    }

    public async start() {
        this.fetchTimer && clearTimeout(this.fetchTimer);

        await this.fetch();

        this.fetchTimer = setInterval(async () => {
            await this.fetch();
        }, this.config.intervalMs);

        console.log(`Fetcher started. Fetching Data from: ${this.config.url}`);
    }
}
