export class Message {
    username: string;
    content: string;
    room: string;
  
    constructor(username: string, content: string, room: string) {
      this.username = username;
      this.content = content;
      this.room = room;
    }
}
