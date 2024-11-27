import { inject, Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { Message } from './message.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chat: WebSocketSubject<Message>;
  private http: HttpClient = inject(HttpClient);

  constructor() {
    this.chat = webSocket('ws://localhost:8080/ws?room=general');
  }

  defineRoom(room: string): void {
    this.closeConnection();
    this.chat = webSocket(`ws://localhost:8080/ws?room=${room}`);
  }

  // Send a message to the server
  sendMessage(message: Message) {
    this.chat.next(message);
  }

  // Receive messages from the server
  getMessages(): Observable<Message> {
    return this.chat.asObservable();
  }

  getHistory(room: string = "general"): Observable<Array<Message>> {
    return this.http.get<Array<Message>>("http://localhost:8080/history?room="+room);
  }

  // Close the WebSocket connection
  closeConnection() {
    this.chat.complete();
  }
}
