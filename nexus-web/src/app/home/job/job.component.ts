import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AIChatbotComponent } from '../../shared/components/ai-chatbot/ai-chatbot.component';
import { ApplicationStatus, JobType } from '../../shared/models/enums.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../../shared/services/shared-data.service';
import { JobApplicationService } from '../../shared/services/job-applications.services';
import { NotificationService } from '../../shared/services/notification.service';

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
	imports: [ CommonModule],
	providers: [DatePipe, BsModalService, JobApplicationService],
	templateUrl: './job.component.html',
	styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit{
	job: any;

	applicationDate = 'Jan 23, 2023';
	applicationStatus = ApplicationStatus.getAll();
	jobApplicationLogs: any = [];

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
	isReadMore: boolean;
	jobId: string;
	jobs: any;
	jobApplication: any;
	currentQuestionInd = 0;

	ngOnInit(): void {
		setInterval(() => { this.currentQuestionInd = (this.currentQuestionInd + 1) % 4}, 2000);	
	}
	
	constructor(private ModalService: BsModalService,
		private route: ActivatedRoute,
		private router: Router,
		private datePipe: DatePipe,
		private sharedDataService: SharedDataService,
		private notificationService: NotificationService, 
		private jobApplicationService: JobApplicationService) {
		this.getJob();
	}

	getJob() {
		this.route.paramMap.subscribe(params => {
			this.jobId = params.get('jobId');
			this.getMyJobApplication();
		});
		this.sharedDataService.getData().subscribe(data => {
			this.jobs = data;
			this.job = this.jobs.find(_ => _.id == this.jobId)
		});
	}

	getStageCompletion(stage) {
		return this.jobApplicationLogs?.find(_ => _.status == stage.id)?.isCompleted;
	}

	getStageCompletionDate(stage) {
		var date = this.jobApplicationLogs?.find(_ => _.status == stage.id)?.completedOn;
		return this.datePipe.transform(date, 'MMM d, yyyy');
	}

	getStageName(stage) {
		return stage.title;
	}

	getJobType(jobType: JobType) {
		return JobType.getById(jobType);
	}

	getJobLocation() {
		return this.job.jobLocations.map(_ => _.city).join(', ');;
	}

	getMyJobApplication() {
		this.jobApplicationService.getAllJobApplications().subscribe(data => {
			this.jobApplication = data.find(_ => _.jobId == this.jobId);
			this.jobApplicationLogs = this.jobApplication?.applicationStatusLog;
		});
	}
	
	applyJob() {
		var jobApplication =  {
			"jobId": this.jobId,
			"tenantId": this.job.tenantId,
			"applicationStatus": ApplicationStatus.New,
			"ApplicationStatusLog": []
		  };
		this.jobApplicationService.addJobApplications(jobApplication).subscribe({
			next: (data: boolean) => {
                if (!data) {
                    this.notificationService.error("Error", "Error in applying for job");
                    return;
                }
				this.notificationService.success("Success", "Successfully applied for job");
				this.getJob();
            },
            error: (err) => {
                this.notificationService.error("Error", err?.message ?? "Error in applying for job")
            }
		});
	}

	goBack() {
		var previousRoute = localStorage.getItem('previousRoute');
		if (previousRoute) {
			this.router.navigate([previousRoute]);
		} else {
			this.router.navigate(['./home']);
		}
	}

	openReadMoreDescription() {
		this.isReadMore = true;
		var description = document.getElementById('jobdecription');
		description.classList.remove('overflow-hidden')
		description.classList.add('h-100')
	}

	openReadLessDescription() {
		this.isReadMore = false;
		var description = document.getElementById('jobdecription');
		description.classList.add('overflow-hidden')
		description.classList.remove('h-100')
	}

	OpenAIChatbot() {
		const config = {
			backdrop: true,
			ignoreBackdropClick: true, // Do not close the modal when clicking outside
			class: 'modal-right right-modal-600' // Example to make the modal large
		};
		this.ModalService.show(AIChatbotComponent, config);
	}
}