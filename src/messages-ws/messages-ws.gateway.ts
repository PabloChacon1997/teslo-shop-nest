import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Socket } from 'socket.io';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messagesWsService: MessagesWsService) {}
  handleDisconnect(client: Socket) {
    console.log('Cliente conectado: ', client.id);
  }
  handleConnection(client: Socket) {
    console.log('Cliente desconectado', client.id);
  }
}
