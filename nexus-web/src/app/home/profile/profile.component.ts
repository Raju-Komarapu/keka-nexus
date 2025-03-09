import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { CandidateProfileService } from './services/candidate-profile-service';
import { CandidateProfile, PreferredModeOfWorking } from './models/candidate-profile';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [DatePipe, NgIf, NgFor, EditProfileComponent]
})
export class ProfileComponent implements OnInit {
    candidateProfile: CandidateProfile;
    preferredModeOfWorking = PreferredModeOfWorking;
    editMode: boolean = false;

    get candidateAddress () {
        return this.candidateProfile.address ? `${this.candidateProfile.address.addressLine1}, ${this.candidateProfile.address.city}, ${this.candidateProfile.address.state}, ${this.candidateProfile.address.countryName} - ${this.candidateProfile.address.zip}` : '--';
    }

    get fullName () {
        return `${this.candidateProfile.firstName} ${this.candidateProfile.middleName ?? ''} ${this.candidateProfile.lastName}`
    }

    constructor(private candidateProfileService: CandidateProfileService) {}

    ngOnInit(): void {
        this.getCandidateProfileDetails();
    }

    getCandidateProfileDetails() {
        this.candidateProfileService.getCandidateDetails().subscribe({
            next: (data) => {
                this.candidateProfile = data;
            }
        })
    }

    onEditProfileClose(isUpdated: boolean) {
        this.editMode = false;
        if (isUpdated) {
            this.getCandidateProfileDetails();
        }
    }
}
  