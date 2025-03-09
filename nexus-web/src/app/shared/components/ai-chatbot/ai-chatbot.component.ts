import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-ai-chatbot',
    templateUrl: './ai-chatbot.component.html',
    standalone: true,
    imports: [CommonModule, FormsModule, NgFor, NgIf]
})
export class AIChatbotComponent {
    private apiUrl = 'https://agent-prod.studio.lyzr.ai/v3/inference/chat/';
    private apiKey = 'sk-default-GvhlMCJd0dWOcB40Y3r9C40ciW7N4Jps';

    userMessage = '';
    suggestedQuestions = [
      'How is the company culture?',
      'What are the working hours?',
      'What are the office locations?',
      'What is the standard salary for an SDE II?'
    ];

    questionAnswers: Array<string> = [];

    isRequestInProgress: boolean = false;

    constructor(
      private modalref: BsModalRef,
      private httpClient: HttpClient,
      private notificationService: NotificationService,
    ) {}
  
    closeChat() {
      this.modalref?.hide();
    }
  
    sendMessage() {
      if (this.userMessage.trim()) {
        const headers = new HttpHeaders({
          'x-api-key': this.apiKey,
        });

        let data = 
        {
          "user_id": "kvinodkumar.091292@gmail.com",
          "system_prompt_variables": {},
          "agent_id": "67cd20ae4f4888a85278dcec",
          "session_id": "67cd20ae4f4888a85278dcec",
          "message": this.userMessage
        };

        this.isRequestInProgress = true;
        this.questionAnswers.push(this.userMessage);
        this.httpClient.post(this.apiUrl, data, { headers }).subscribe({
          next: (data) =>{
            this.isRequestInProgress = false;
            if(data)
            {
              this.questionAnswers.push(data['response'] ?? 'error in generating response');
            }

            this.userMessage = '';
          },
          error: (err) => 
          {
            this.questionAnswers.pop();
            this.isRequestInProgress = false;
            this.userMessage = '';
            this.notificationService.error("Error", err?.message ?? "Error logging in")
          }
        })
      }
    }
  
    askQuestion(question: string) {
      if(!this.isRequestInProgress)
      {
        this.userMessage = question;
        this.sendMessage();
      }
    }
  }