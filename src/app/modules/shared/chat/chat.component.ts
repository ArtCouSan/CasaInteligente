import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

  chat = {
    status: 'primary',
    title: 'Nebular Conversational UI Primary',
    messages: [
      {
        text: 'Hello!',
        date: new Date(),
        reply: true,
        type: 'text',  // Pode ser 'text', 'file', 'image', etc.
        files: [],     // Array de arquivos se aplicável
        user: {
          name: 'John Doe',
          avatar: 'path-to-avatar',
        }
      }
    ],
  }

  sendMessage(messages: any, event: any) {
    messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      user: {
        name: 'Jonh Doe',
        avatar: 'https://techcrunch.com/wp-content/uploads/2015/08/safe_image.gif',
      },
    });
  }

}
