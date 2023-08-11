class Subscriber {
    private socket: WebSocket | null = null;
    private messageCallback: ((message: string) => void) | null = null;

    constructor(webSocket: WebSocket) {
        this.socket = webSocket;
        this.socket.addEventListener("open", this.handleOpenConnection);
        this.socket.addEventListener("message", this.handleMessage.bind(this));
        this.socket.addEventListener(
            "close",
            this.handleCloseConnection.bind(this)
        );
    }

    private handleOpenConnection() {
        console.log("WebSocket connected");
    }
    private handleMessage(event: MessageEvent) {
        if (this.messageCallback) {
            this.messageCallback(event.data);
        }
    }
    private handleCloseConnection() {
        if (this.socket) {
            return;
        }
        this.socket!.addEventListener("close", () => {
            console.log("WebSocket closed");
            this.socket = null;
        });
    }

    public send(message: string) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        }
    }

    public setMessageCallback(callback: (message: string) => void) {
        this.messageCallback = callback;
    }
}

const websocket = new WebSocket("ws://localhost:4444");

const theKeySubscriber = new Subscriber(websocket);
export default theKeySubscriber;
