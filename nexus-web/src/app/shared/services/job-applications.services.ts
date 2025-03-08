import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class JobApplicationService {

    private apiUrl: string = '/api/jobapplication'
    constructor(private httpClient: HttpClient) { }

    getAllJobApplications(): Observable<any> {
        return this.httpClient.get<any>(`${this.apiUrl}`);
    }

    addJobApplications(jobApplication: any): Observable<any> {
        return this.httpClient.post<any>(`${this.apiUrl}`, jobApplication);
    }
}
