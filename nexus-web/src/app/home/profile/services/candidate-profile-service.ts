import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CandidateProfile } from '../models/candidate-profile';

@Injectable({
    providedIn: 'root'
})
export class CandidateProfileService {

    private apiUrl: string = '/api/candidateprofile'
    constructor(private httpClient: HttpClient) { }

    getCandidateDetails(): Observable<CandidateProfile> {
        return this.httpClient.get<CandidateProfile>(`${this.apiUrl}/me`);
    }

    updateCandidateDetails(profileId: number,candidateProfile: CandidateProfile): Observable<boolean> {
        return this.httpClient.put<boolean>(`${this.apiUrl}/${profileId}`, candidateProfile);
    }
}
