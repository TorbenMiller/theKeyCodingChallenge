// __mocks__/websocket.js
import { vitest } from "vitest";
class MockWebSocket {
    constructor(url) {
        this.url = url;
        this.readyState = WebSocket.OPEN;
        this.send = vitest.fn();
        this.addEventListener = vitest.fn();
    }
}

export default MockWebSocket;
