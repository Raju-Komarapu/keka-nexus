import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
}