import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatService } from './service/chat.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'clientws';

  chatService = inject(ChatService);

  constructor() {
    this.chatService.getMessages().subscribe(message => {
      console.log('Received message:', message);
    });
    const message = {
      username: "cthulhu",
      content: "Hello, server!"
    }
    this.chatService.sendMessage(message);
  }
}
