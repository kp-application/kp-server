import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ namespace: "" })
export class EventGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer() server: Server;

    afterInit(server: Server): any {
        console.log("Socket initialize");
    }

    handleConnection(@ConnectedSocket() socket: Socket) {
        console.log("Connected");

        socket.emit("hello", "hello");
    }

    handleDisconnect(@ConnectedSocket() socket: Socket) {
        console.log("Disconnected");
    }
}
