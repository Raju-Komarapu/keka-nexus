import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { JobType } from '../../models/enums.model';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'all-jobs',
    templateUrl: './all-jobs.component.html',
    standalone: true,
    imports: [NgIf, NgFor]
})
export class AllJobsComponent implements OnInit {
    allJobsUrls: Array<string> = 
        [
            'https://komarapuraju.kekad.com/careers/api/jobs/rameshtech/active',
            'https://sravanth.kekad.com/careers/api/embedjobs/rajutech/active/91dde0b4-75d6-483b-8dd0-723dd79e879c',
            'https://kohinoor.kekad.com/careers/api/embedjobs/gamechanger/active/7b3d03d6-192b-4b44-a953-6ad0789e538b',
            'https://dupli.kekad.com/careers/api/embedjobs/virat/active/841feddf-f587-4a22-9c14-401b22e58a46'
        ];
    
    allJobs: Array<any>;

    getJobType(jobType: JobType) {
        return JobType.getById(jobType);
    }

    constructor(private httpClient: HttpClient,
                private notificationService: NotificationService) {
    }

    ngOnInit() {
        forkJoin(this.allJobsUrls.map(jobsUrl => this.httpClient.get<any>(jobsUrl))).subscribe({
            next: (data) => {
                if(data)
                {
                    this.allJobs = data.flat();
                }
            },
            error: (err) => 
            {
                this.notificationService.error("Error", err?.message ?? "Error logging in")
            }
        });
    }
}