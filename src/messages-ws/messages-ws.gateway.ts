import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(private readonly messagesWsService: MessagesWsService) {}
  handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;
    console.log({ token });
    this.messagesWsService.registerClient(client);
    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);
    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  @SubscribeMessage('mesage-from-client')
  handleMessageFromClient(client: Socket, payload: NewMessageDto) {
    //! Emite unicamente al cliente
    // client.emit('messages-from-server', {
    //   fullName: 'Soy yoo',
    //   message: payload.message || 'No Message',
    // });
    //! Emitir a todos menos al cliente inicial
    // client.broadcast.emit('messages-from-server', {
    //   fullName: 'Soy yoo',
    //   message: payload.message || 'No Message',
    // });
    //! Emitir a todos menos
    this.wss.emit('messages-from-server', {
      fullName: 'Soy yoo',
      message: payload.message || 'No Message',
    });
  }
}
