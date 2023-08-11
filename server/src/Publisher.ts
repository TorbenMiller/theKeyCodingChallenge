import EventEmitter from "node:events";
import { WebSocket, WebSocketServer } from "ws";
import { IncomingMessage } from "http";

type ipAddress = string;

export class Publisher {
    webSocketServer: WebSocketServer;
    clients: Map<ipAddress, WebSocket> = new Map();
    data: string = "";

    constructor(webSocketServer: WebSocketServer, emitter: EventEmitter) {
        this.webSocketServer = webSocketServer;

        this.webSocketServer.on("connection", this.handleConnection.bind(this));
        emitter.on("newData", this.handleNewData.bind(this));
    }

    private handleConnection(ws: WebSocket, req: IncomingMessage) {
        ws.on("error", console.error);

        const ip = req.socket.remoteAddress; //req.headers['x-forwarded-for'].split(',')[0].trim(); todo proxy

        if (!ip) {
            return;
        }

        ws.on("close", () => {
            console.log("Client disconnected.");

            this.clients.delete(ip);
        });

        if (this.clients.has(ip)) {
            console.log("Client already connected!");

            this.clients.delete(ip);
        }

        this.clients.set(ip, ws);

        ws.send("Connected.");
        ws.send(this.data);

        console.log("Clients connected:", this.clients.size);
    }

    private handleNewData(messageData: string) {
        this.data = messageData;
        this.publish();
    }

    private publish() {
        this.clients.forEach((client) => client.send(this.data));
    }

    public start() {
        console.log("Starting WebSocket server...");
        this.webSocketServer.on("listening", () => {
            console.log(
                `WebsocketServer started on port: ${this.webSocketServer.options.port}`
            );
        });
        this.webSocketServer.on("error", (error) => {
            console.error("WebSocket server error:", error);
        });
    }
}
