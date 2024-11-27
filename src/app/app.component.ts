import { Component, inject, OnDestroy } from '@angular/core';
import { ChatService } from './service/chat.service';
import { Subscription } from 'rxjs';
import { ChatContainerComponent } from './component/chat-container/chat-container.component';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ChatContainerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {

  chatService = inject(ChatService);
  private subs: Subscription;
  messages: any[] = [];
  currentMessage: string = '';
  currentUsername: string = '';

  constructor() {
    const username = sessionStorage.getItem('username');
    if(username) {
      this.currentUsername = username;
    }
    
    const s = this.chatService.getHistory().subscribe(message => {
      this.messages = message.reverse();
      s.unsubscribe();
    });

    this.subs = this.chatService.getMessages().subscribe(message => {
      this.messages = [...this.messages, message];
    });
    
  }

  getValue(a: Event) {
    if(this.currentUsername !== '') {
      this.currentMessage = (a.target as HTMLInputElement).value;
    } else {
      this.currentUsername = (a.target as HTMLInputElement).value;
      this.ok();
    }
  }

  ok() {
    sessionStorage.setItem('username', this.currentUsername);
  }
  
  sendMessage() {
    const message = {
      username: this.currentUsername,
      content: this.currentMessage,
      room: "room1"
    }
    
    if(this.currentMessage.length > 0) {
      this.chatService.sendMessage(message);
    }

    const input = document.getElementById('typping') as HTMLInputElement;
    input.value = '';
    input.focus();
    this.currentMessage = '';
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.chatService.closeConnection();
  }

}
