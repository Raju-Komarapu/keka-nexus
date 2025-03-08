import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedDataService {
    private data: any = [];

    allJobsUrls: Array<string> =
        [
            'https://komarapuraju.kekad.com/careers/api/jobs/rameshtech/active',
            'https://sravanth.kekad.com/careers/api/embedjobs/rajutech/active/91dde0b4-75d6-483b-8dd0-723dd79e879c',
            'https://kohinoor.kekad.com/careers/api/embedjobs/gamechanger/active/7b3d03d6-192b-4b44-a953-6ad0789e538b',
            'https://dupli.kekad.com/careers/api/embedjobs/virat/active/841feddf-f587-4a22-9c14-401b22e58a46'
        ];

        tenantMappings = [
            ['96b0f003-5600-4a23-9e06-1d9eec557a7d', 'Keka Technologies', 'https://stkekastaticdev.blob.core.windows.net/shared/branding/logo/keka-logo.svg'],
            ['8ecd5c82-8c88-42f6-8c4c-61d865e3ecdb', 'Meta Technologies', 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/512px-Facebook_f_logo_%282021%29.svg.png?20210818083032'],
            ['2e5dc04b-e1be-4037-a11b-014831d2fdff', 'Google', 'https://freelogopng.com/images/all_img/1657955079google-icon-png.png'],
            ['7f7b3afb-ddc4-4e7c-9a70-31046f05837d', 'Youtube', 'https://www.interstellarrift.com/wiki/images/d/d8/Youtube-logo-png-photo-0.png']
        ]

    constructor(private httpClient: HttpClient) { }

    getData(): Observable<any> {
        // If data is already cached, return it as an observable
        if (this.data?.length) {
            return of(this.data);
        }

        // Fetch data from all jobs URLs and flatten the result
        return forkJoin(this.allJobsUrls.map(jobsUrl => this.httpClient.get<any>(jobsUrl))).pipe(
            map((dataArray) => {
                if (dataArray) {
                    for (let index = 0; index < 4; index++) {
                        var jobs = dataArray[index];
                        var tenantMapping = this.tenantMappings[0];
                        jobs.forEach(data => {
                            data.tenantId = tenantMapping[0];
                            data.companyName = tenantMapping[1];
                            data.companylogo = tenantMapping[2];
                        })
                        this.data = [...this.data, ...jobs]
                    }
                    return this.data;
                }
                return [];
            })
        );
    }

    setData(newData: any) {
        this.data = newData;
    }
}
