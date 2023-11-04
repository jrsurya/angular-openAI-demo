import { Component } from '@angular/core';
import { ChatGptService } from '..//services/chatgpt.service';
import { ChatMessageModel } from './ChatMessageModel'
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent {
  inputText = '';
  chatMessages: ChatMessageModel[] = [];

  constructor(private chatGptService: ChatGptService) { }

  onSubmit() {
    console.log(this.inputText);
    if (this.inputText === "") return;
    // Add the user message to the chat history
    this.chatMessages.push({ text: this.inputText, isUser: true });

    this.chatGptService.getGPTResponse(this.inputText).subscribe((data: any) => {
      const completions = { text: data.choices[0].text, isUser: false }
      this.chatMessages.push(completions);
    });

    this.inputText = '';
  }
}
