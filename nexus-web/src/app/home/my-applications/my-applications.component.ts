import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobApplicationService } from '../../shared/services/job-applications.services';
import { Router } from '@angular/router';
import { SharedDataService } from '../../shared/services/shared-data.service';
import { ApplicationStatus, JobType } from '../../shared/models/enums.model';

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

    .status-button {
        background-color: #e6f7ff; /* Light blue background */
        color: #007bff; /* Blue text color */
        border: 1px solid #007bff; /* Blue border */
        border-radius: 20px; /* Rounded edges */
        padding: 5px 15px; /* Padding for button */
        font-size: 14px; /* Text size */
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
  `]
})
export class MyApplicationsComponent {
    activeTab = 'active';

    applications: any = [];

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
    allJobs: any;
    isLoaded: boolean = false;

    constructor(private jobApplicationService: JobApplicationService,
        private sharedDataService: SharedDataService,
        private router: Router) {
        this.sharedDataService.getData().subscribe(data => {
            this.allJobs = data;
            this.getAllJobApplication()
        });
    }

    goTojob(jobId: number) {
        localStorage.setItem('previousRoute', this.router.url)
        this.router.navigate([`./home/job/${jobId}`])
    }

    getJobLocations(job) {
		return job != null ? job.jobLocations.map(_ => _.city).join(', ') : [];
	}

    getAllJobApplication() {
        this.jobApplicationService.getAllJobApplications().subscribe(data => {
            this.applications = data;
            this.applications.forEach(application => {
                application.job = this.allJobs.find(job => job.id == application.jobId);
            });
            this.isLoaded = true;
        });
    }

    getApplicationStatus(status) {
        return ApplicationStatus.getById(status);
    }

    getJobType(jobType: JobType) {
		return JobType.getById(jobType);
	}

    goToHome() {
        this.router.navigate(['/home']);
    }


}