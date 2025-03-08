import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AIChatbotComponent } from '../../shared/components/ai-chatbot/ai-chatbot.component';
import { JobAppliedConfirmation } from '../../shared/components/job-applied-confirmation/job-applied-confirmation.component';
import { ApplicationStatus, JobType } from '../../shared/models/enums.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../../shared/services/shared-data.service';
import { JobApplicationService } from '../../shared/services/job-applications.services';
import { NotificationService } from '../../shared/services/notification.service';
import { AuthService } from '../../auth/services/auth.service';
import { ContextService } from '../../context/context-service';
import { User } from '../../context/user';

interface Mentor {
	name: string;
	role: string;
	experience: string;
	rating: Array<any>;
	image: string;
}

@Component({
	selector: 'app-job',
	standalone: true,
	imports: [CommonModule],
	providers: [DatePipe, BsModalService, JobApplicationService],
	templateUrl: './job.component.html',
	styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
	job: any;

	applicationDate = 'Jan 23, 2023';
	applicationStatus = ApplicationStatus.getAll();
	jobApplicationLogs: any = [];

	mentors: Mentor[] = [
		{
			name: 'Vinod Kumar',
			role: 'Full Stack Developer',
			experience: '6 Years Experience',
			rating: [1, 2, 3, 4, 5],
			image: 'https://avatar.iran.liara.run/public/boy'
		},
		{
			name: 'Vrishti Jain',
			role: 'Full Stack Developer',
			experience: '5 Years Experience',
			rating: [1, 2, 3, 4],
			image: 'https://avatar.iran.liara.run/public/girl'
		},
		{
			name: 'Tharun Gade',
			role: 'Full Stack Developer',
			experience: '3 Years Experience',
			rating: [1, 2, 3],
			image: 'https://avatar.iran.liara.run/public/boy'
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
	user: User;

	ngOnInit(): void {
		setInterval(() => { this.currentQuestionInd = (this.currentQuestionInd + 1) % 4 }, 2000);
	}

	constructor(private ModalService: BsModalService,
		private route: ActivatedRoute,
		private authService: AuthService,
		private contextService: ContextService,
		private router: Router,
		private datePipe: DatePipe,
		private sharedDataService: SharedDataService,
		private notificationService: NotificationService,
		private jobApplicationService: JobApplicationService) {
		this.getJob();
		this.user = this.contextService.getUser(); 
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
		if (this.authService.isLoggedIn()) {
			this.jobApplicationService.getAllJobApplications().subscribe({
				next: (data) => {
					this.jobApplication = data.find(_ => _.jobId == this.jobId);
					this.jobApplicationLogs = this.jobApplication?.applicationStatusLog;
				},
				error: (err) => {
					this.notificationService.error("Error", err?.message ?? "Error in applying for job")
				}
			});
		}
	}

	applyJob() {
		if (this.authService.isLoggedIn()) {
			var jobApplication = {
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
					this.openJobAppliedConfirmation();
				},
				error: (err) => {
					this.notificationService.error("Error", err?.message ?? "Error in applying for job")
				}
			});
		}
		else {
			this.router.navigate(['./login']);
		}
	}

	openJobAppliedConfirmation() {
		const config = {
			backdrop: true,
			ignoreBackdropClick: true,
		};

		const modalRef = this.ModalService.show(JobAppliedConfirmation, config);
		modalRef.content.sendConfirmation.subscribe((data: boolean) => {
			if(data) {
				this.jobApplication.applicationStatus = ApplicationStatus.Screening;
				this.jobApplicationService.updateJobApplicationStatus(this.jobApplication).subscribe(
					{
						next: (data) => {
							this.notificationService.success("Success", "Successfully moved to screening");
							this.getJob();
						},
						error:  (err) => {
							this.notificationService.error("Error", err?.message ?? "Error in completing the screening")
						}
					}
				);
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