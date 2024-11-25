import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Message } from '../../service/message.model';

@Component({
  selector: 'chat-container',
  standalone: true,
  imports: [],
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.scss',
})
export class ChatContainerComponent implements OnChanges {
  @Input() messages: Message[] = [];
 
  ngOnChanges(changes: SimpleChanges): void {
    setTimeout( () => {
      this.scrollBottom();
    }, 250);
  }

  scrollBottom() {
    if(this.messages.length == 0){
      return;
    }
    const msg = "msg-"+(this.messages.length-1);
    const element = document.getElementById(msg);
    if(element) {
      element.scrollIntoView({block: "end", inline: "nearest",behavior: "smooth"});
    }
  }

}
