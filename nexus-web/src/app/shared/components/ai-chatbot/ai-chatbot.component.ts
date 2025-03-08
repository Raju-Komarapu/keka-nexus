import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-ai-chatbot',
    templateUrl: './ai-chatbot.component.html',
    standalone: true,
    imports: [CommonModule, FormsModule]
})
export class AIChatbotComponent {
    userMessage = '';
    suggestedQuestions = [
      'How is the company culture?',
      'What are the working hours?',
      'What are the office locations?'
    ];

    constructor(
      private modalref: BsModalRef,
    ) {}
  
    closeChat() {
      this.modalref?.hide();
    }
  
    sendMessage() {
      if (this.userMessage.trim()) {
        this.userMessage = '';
      }
    }
  
    askQuestion(question: string) {
      this.userMessage = question;
      this.sendMessage();
    }
  }