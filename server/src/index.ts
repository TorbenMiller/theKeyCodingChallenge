import { EventEmitter } from "node:events";
import { Fetcher } from "./Fetcher";
import { Parser } from "./Parser";
import { Publisher } from "./Publisher";
import { WebSocketServer } from "ws";

const url = "https://www.thekey.academy/wp-json/wp/v2/posts";

const port = 4444;

const theKeyParser = new Parser();

const theKeyEmitter = new EventEmitter();

const theKeySocket = new WebSocketServer({ port });

const theKeyPublisher = new Publisher(theKeySocket, theKeyEmitter);

const theKeyFetcher = new Fetcher(
    { url, intervalMs: 5000 },
    theKeyParser,
    theKeyEmitter
);

theKeyFetcher.start();
theKeyPublisher.start();
