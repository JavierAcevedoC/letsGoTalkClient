import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: WebSocketSubject<Message>;
  constructor() {
    this.socket = webSocket('ws://localhost:8080/ws?room=general');
  }

  defineRoom(room: string): void {
    this.closeConnection();
    this.socket = webSocket(`ws://localhost:8080/ws?room=${room}`);
  }

  // Send a message to the server
  sendMessage(message: Message) {
    this.socket.next(message);
  }

  // Receive messages from the server
  getMessages(): Observable<Message> {
    return this.socket.asObservable();
  }

  // Close the WebSocket connection
  closeConnection() {
    this.socket.complete();
  }
}
