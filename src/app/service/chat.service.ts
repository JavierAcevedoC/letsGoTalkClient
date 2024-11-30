import { inject, Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { Message } from './message.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/env.local';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chat: WebSocketSubject<Message>;
  private http: HttpClient = inject(HttpClient);

  private baseURL= environment.baseURL
  constructor() {
    this.chat = webSocket("ws://"+ this.baseURL +"/ws?room=general");
  }

  defineRoom(room: string): void {
    this.closeConnection();
    this.chat = webSocket(`ws://${this.baseURL}/ws?room=${room}`);
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
    return this.http.get<Array<Message>>("http://"+ this.baseURL +"/history?room="+room);
  }

  // Close the WebSocket connection
  closeConnection() {
    this.chat.complete();
  }
}
