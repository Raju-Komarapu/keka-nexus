import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Application {
  company: string;
  position: string;
  location: string;
  experience: string;
  type: string;
  status: string;
}

interface Interview {
  company: string;
  position: string;
  date: string;
  time: string;
  platform: string;
}

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-applications.component.html',
  styles: [`
    .applications-container {
      margin: 0 auto;
    }

    .join-button {
        background: #5746af;
        color: white;
        height: 100px;
        width: 80px;
    }
    
    .tabs {
      margin-bottom: 20px;
      border-bottom: 1px solid #e0e0e0;
    }
    
    h2 {
      margin-top: 32px;
      margin-bottom: 16px;
    }
    
    h3 {
      margin: 0 0 8px 0;
    }
    
    p {
      margin: 4px 0;
      color: #666;
    }
  `]
})
export class MyApplicationsComponent {
  activeTab = 'active';

  applications: Application[] = [
    {
      company: 'LinkedIn',
      position: 'Senior Software Engineer',
      location: 'Hyderabad',
      experience: '4-7 yrs',
      type: 'Full time',
      status: 'Interview'
    },
    {
      company: 'Airbnb',
      position: 'Principle Software Engineer',
      location: 'Hyderabad',
      experience: '5-9 yrs',
      type: 'Full time',
      status: 'Interview'
    },
    {
      company: 'Tech lead',
      position: 'Tech lead',
      location: 'Hyderabad',
      experience: '6-9 yrs',
      type: 'Full time',
      status: 'Application submitted'
    }
  ];

  interviews: Interview[] = [
    {
      company: 'Tech lead',
      position: 'Senior Software Engineer',
      date: 'Jul 18',
      time: '9:30am - 10:30am',
      platform: 'Google meet'
    },
    {
      company: 'Tech lead',
      position: 'Principle Software Engineer',
      date: 'Jul 20',
      time: '2:30pm - 3:30pm',
      platform: 'Google meet'
    }
  ];
}