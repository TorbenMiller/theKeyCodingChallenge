import { EventEmitter } from "node:events";
import { WebSocket, WebSocketServer } from "ws";
import { Publisher } from "../src/Publisher"; // Update the import path as needed
import { IncomingMessage } from "http";

describe("Publisher Class Tests", () => {
    let mockWebSocketServer: WebSocketServer;
    let mockEventEmitter: EventEmitter;
    let publisher: Publisher;

    beforeEach(() => {
        mockWebSocketServer = {
            on: jest.fn(),
        } as unknown as WebSocketServer;

        mockEventEmitter = {
            on: jest.fn(),
        } as unknown as EventEmitter;

        publisher = new Publisher(mockWebSocketServer, mockEventEmitter);
    });

    it("should create a Publisher instance", () => {
        expect(publisher).toBeInstanceOf(Publisher);
    });

    it("should handle new connection", () => {
        const mockWebSocket: Partial<WebSocket> = {
            on: jest.fn(),
            send: jest.fn(),
        };
        const mockIncomingMessage = {
            socket: {
                remoteAddress: "127.0.0.1",
            },
        } as unknown as IncomingMessage;

        const mockIp = "127.0.0.1";

        publisher["handleConnection"](
            mockWebSocket as WebSocket,
            mockIncomingMessage
        );

        expect(publisher.clients.size).toBe(1);
        expect(publisher.clients.get(mockIp)).toBe(mockWebSocket);

        expect(mockWebSocket.on).toHaveBeenCalledWith(
            "close",
            expect.any(Function)
        );
    });

    it("should handle new data", () => {
        const newData = "New test data";
        const mockWebSocket: WebSocket = {
            send: jest.fn(),
        } as unknown as WebSocket;

        publisher.clients.set("127.0.0.1", mockWebSocket);
        publisher["handleNewData"](newData);

        expect(publisher.data).toBe(newData);
        expect(mockWebSocket.send).toHaveBeenCalledWith(newData);
    });

    it("should publish data to clients", () => {
        const newData = "New test data";
        const mockWebSocket1: WebSocket = {
            send: jest.fn(),
        } as unknown as WebSocket;
        const mockWebSocket2: WebSocket = {
            send: jest.fn(),
        } as unknown as WebSocket;

        publisher.clients.set("127.0.0.1", mockWebSocket1);
        publisher.clients.set("192.168.0.1", mockWebSocket2);
        publisher.data = newData;

        publisher["publish"]();

        expect(mockWebSocket1.send).toHaveBeenCalledWith(newData);
        expect(mockWebSocket2.send).toHaveBeenCalledWith(newData);
    });

    // Add more tests as needed for edge cases and other methods
});
