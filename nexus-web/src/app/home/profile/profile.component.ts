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
        return this.candidateProfile.address ? `${this.candidateProfile.address.countryName}, ${this.candidateProfile.address.state}, ${this.candidateProfile.address.city}, ${this.candidateProfile.address.addressLine1}, ${this.candidateProfile.address.addressLine2}, ${this.candidateProfile.address.zip}` : '--';
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


const candidateProfile: CandidateProfile = {
    "id": 1,
    "firstName": "John",
    "middleName": "A.",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "dateOfBirth": "1990-01-01T00:00:00Z",
    "expectedSalary": "$80,000",
    "currentSalary": "$75,000",
    "address": {
      "addressLine1": "123 Main St",
      "addressLine2": "Apt 4B",
      "countryCode": "US",
      "city": "New York",
      "state": "NY",
      "zip": "10001",
      "countryName": "United States"
    },
    "currentLocation": "New York, NY",
    "preferredLocation": null,
    "experience": [
      {
        "companyName": "ABC Corp",
        "designation": "Software Engineer",
        "isCurrentlyWorking": true,
        "dateOfJoining": new Date("2015-06-01T00:00:00Z"),
        "dateOfRelieving": new Date("2023-03-01T00:00:00Z"),
        "location": "New York, NY"
      }
    ],
    "education": [
      {
        "degree": "Bachelor of Science",
        "specialization": "Computer Science",
        "startDate": new Date("2010-09-01T00:00:00Z"),
        "endDate": new Date("2014-06-01T00:00:00Z"),
        "score": "3.7",
        "institutionName": "State University",
        "location": "New York, NY"
      }
    ],
    "resumeLocation": "http://example.com/resume/johndoe.pdf"
  }
  