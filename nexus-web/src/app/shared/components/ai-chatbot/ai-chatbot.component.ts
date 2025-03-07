import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContextService } from '../../../context/context-service';

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
  
    closeChat() {
      // Implement close functionality
    }
  
    sendMessage() {
      if (this.userMessage.trim()) {
        // Implement message sending logic
        this.userMessage = '';
      }
    }
  
    askQuestion(question: string) {
      // Implement question handling logic
      this.userMessage = question;
      this.sendMessage();
    }
  }