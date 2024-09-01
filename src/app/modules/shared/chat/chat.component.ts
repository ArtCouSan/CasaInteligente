import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faComments, faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import { ChatService } from '../../../service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class ChatComponent {

  @Input() colaboradorId!: number;  // O ID do colaborador será passado como input
  isMinimized = true;
  message = '';
  messages: any[] = [];

  constructor(
    private chatService: ChatService,
    library: FaIconLibrary
  ) {
    library.addIcons(faComments);
    library.addIcons(faCircleArrowUp);
  }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.chatService.getMessages(this.colaboradorId).subscribe((data) => {
      this.messages = data;
    });
  }

  sendMessage(): void {
    if (this.message.trim()) {
      // Primeiro, adiciona a mensagem do usuário à lista de mensagens
      const userMessage = {
        text: this.message.trim(),
        sender: 'user'
      };
      this.messages.push(userMessage);

      // Em seguida, envia a mensagem ao servidor
      this.chatService.sendMessage(this.colaboradorId, this.message.trim()).subscribe((botMessage) => {
        // Adiciona a resposta do bot à lista de mensagens
        this.messages.push(botMessage);
      });

      // Limpa o campo de entrada de texto
      this.message = '';
    }
  }

  toggleMinimize() {
    this.isMinimized = !this.isMinimized;
  }
}
