import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AIChatbotComponent } from '../shared/components/ai-chatbot/ai-chatbot.component';

interface Mentor {
  name: string;
  role: string;
  experience: string;
  rating: number;
  image: string;
}

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [CommonModule],
  providers: [BsModalService],
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent {
  jobTitle = 'Senior Software Engineer';
  company = 'LinkedIn';
  location = 'Hyderabad';
  experience = '0 - 2 yrs';
  type = 'Full time';
  salary = '₹20,00,000 - ₹25,00,000 per annum';
  applicationDate = 'Jan 23, 2023';

  stages = [
    { name: 'Application submitted', completed: true },
    { name: 'Application under review', completed: false },
    { name: 'Interview', completed: false },
    { name: 'Offer letter', completed: false },
    { name: 'Hired', completed: false }
  ];

  mentors: Mentor[] = [
    {
      name: 'Vanita Kumar',
      role: 'Full Stack Developer',
      experience: '12 Years Experience',
      rating: 4,
      image: 'https://via.placeholder.com/50'
    },
    {
      name: 'Vinod Kumar',
      role: 'Full Stack Developer',
      experience: '12 Years Experience',
      rating: 4,
      image: 'https://via.placeholder.com/50'
    },
    {
      name: 'Vinod Kumar',
      role: 'Full Stack Developer',
      experience: '12 Years Experience',
      rating: 4,
      image: 'https://via.placeholder.com/50'
    }
  ];

  questions = [
    'What are the working hours?',
    'How is the company culture?',
    'What are the offsite locations?',
    'What is the standard salary for an SDE II?'
  ];

  
  constructor(private ModalService: BsModalService) {
    
  }

  OpenAIChatbot(){
    const config = {
        backdrop: true,
        ignoreBackdropClick: true, // Do not close the modal when clicking outside
        class: 'modal-right' // Example to make the modal large
      };
    this.ModalService.show(AIChatbotComponent, config);
  }
}