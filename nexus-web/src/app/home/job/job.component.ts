import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AIChatbotComponent } from '../../shared/components/ai-chatbot/ai-chatbot.component';
import { JobType } from 'src/app/shared/models/enums.model';

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
	job: any={
        "id": 31314,
        "title": "jt",
        "description": "<div><strong>&nbsp;</strong></div><div>We aspire to build a high-quality, innovative &amp; robust software.&nbsp;If you are a hands-on platform builder with significant experience in developing scalable data platforms, look no further. Click on Apply and we will reach out to you soon.</div><div>&nbsp;</div><div><strong>Your responsibilities as an Engineer:&nbsp;</strong></div><div>•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Determines operational feasibility by evaluating analysis, problem definition, requirements, solution development, and proposed solutions.</div><div>•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Documents and demonstrates solutions by developing documentation, flowcharts, layouts, diagrams, charts, code comments and clear code.</div><div>•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Prepares and installs solutions by determining and designing system specifications, standards, and programming.</div><div>•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Improves operations by conducting systems analysis; recommending changes in policies and procedures.</div><div>•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Obtains and licenses software by obtaining required information from vendors; recommending purchases; testing and approving products.</div><div>•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Updates job knowledge by studying state-of-the-art development tools, programming techniques, and computing equipment</div><div>•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Participate in educational opportunities &amp; read professional publications;</div><div>•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Protects operations by keeping information confidential.</div><div>•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Provides information by collecting, analyzing, and summarizing development and service issues.</div><div>•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Accomplishes engineering and organization mission by completing related results as needed.</div><div>•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Develops software solutions by studying information needs; conferring with users; studying systems flow, data usage, and work processes; investigating problem areas; following the software development lifecycle.</div><div>&nbsp;</div><div>&nbsp;</div><div><strong>Skill sets we require:</strong></div><div>&nbsp;</div><div>•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Proven work experience as a Software Engineer or Software Developer</div><div>•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Experience designing interactive applications</div><div>•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ability to develop software in Java, Ruby on Rails, C++ or other programming languages</div><div>•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Excellent knowledge of relational databases, SQL and ORM technologies (JPA2, Hibernate)</div><div>•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Experience developing web applications using at least one popular web framework (JSF, Wicket, GWT, Spring MVC)</div><div>•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Experience with test-driven development</div><div>•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Proficiency in software engineering tools</div><div>•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ability to document requirements and specifications</div><div>&nbsp;</div><div><strong>Experience &amp; Pedigree:&nbsp;</strong></div><div>&nbsp;</div><div>•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bachelor’s/Master’s degree in Computer Science Engineering or equivalent&nbsp;</div>",
        "departmentId": 24133,
        "departmentName": "LOCAL",
        "jobLocations": [
            {
                "id": 5857,
                "name": "SKJSD",
                "city": "JSD",
                "state": "WB",
                "countryCode": "IN",
                "countryName": "India"
            }
        ],
        "jobType": 2,
        "experience": "5",
        "jobNumber": "DUP2655HIRO!",
        "salaryRange": {
            "currency": "INR",
            "salaryPeriod": 0,
            "cultureInfo": "en-IN"
        },
        "salaryRangeFormat": "",
        "publishedOn": "2025-01-28T05:26:28.997Z",
        "publishedSinceDays": 38
    }

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

	getJobType(jobType: JobType) {
        return JobType.getById(jobType);
    }

	getJobLocation() {
		return this.job.jobLocations.map(_ => _.city).join(', ');;
	}

	OpenAIChatbot() {
		const config = {
			backdrop: true,
			ignoreBackdropClick: true, // Do not close the modal when clicking outside
			class: 'modal-right' // Example to make the modal large
		};
		this.ModalService.show(AIChatbotComponent, config);
	}

}