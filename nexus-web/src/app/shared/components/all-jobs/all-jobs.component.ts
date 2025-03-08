import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { JobType } from '../../models/enums.model';
import { NotificationService } from '../../services/notification.service';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
    selector: 'all-jobs',
    templateUrl: './all-jobs.component.html',
    standalone: true,
    styles: [`
    a:hover {
        background-color: #F8F9FA;
      }
    `],
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
    tenantMappings = [
        ['96b0f003-5600-4a23-9e06-1d9eec557a7d', 'Keka Technologies'], 
        ['8ecd5c82-8c88-42f6-8c4c-61d865e3ecdb', 'Raju Technologies'], 
        ['2e5dc04b-e1be-4037-a11b-014831d2fdff', 'Sravanth Technologies Pvt Ltd'], 
        ['7f7b3afb-ddc4-4e7c-9a70-31046f05837d', 'Ravi Technologies']
    ]
        
    allJobs: Array<any> = [];
    filteredJobs: any[];

    getJobType(jobType: JobType) {
        return JobType.getById(jobType);
    }

    constructor(private httpClient: HttpClient,
                private notificationService: NotificationService,
                private router: Router,
                private sharedDataService: SharedDataService) {
    }

    ngOnInit() {
        forkJoin(this.allJobsUrls.map(jobsUrl => this.httpClient.get<any>(jobsUrl))).subscribe({
            next: (data) => {
                if(data)
                {
                    for (let index = 0; index < 4; index++) {
                        var jobs = data[index];
                        var tenantMapping = this.tenantMappings[index];
                        jobs.forEach(data => {
                            data.tenantId = tenantMapping[0];
                            data.companyName = tenantMapping[1];
                        })
                        this.allJobs = [...this.allJobs, ...jobs]
                        this.allJobs.sort((a, b) => {
                            const dateDiff = a.publishedSinceDays - b.publishedSinceDays;
                            if (dateDiff === 0) {
                              return a.title.localeCompare(b.jobTitle);
                            }
                          
                            return dateDiff;
                          });
                    }
                    this.filteredJobs = this.allJobs;
                    this.sharedDataService.setData(this.allJobs);
                }
            },
            error: (err) => 
            {
                this.notificationService.error("Error", err?.message ?? "Error logging in")
            }
        });
    }

    goTojob(jobId: number) {
        localStorage.setItem('previousRoute', this.router.url)
        this.router.navigate([`./home/job/${jobId}`])
    }
}