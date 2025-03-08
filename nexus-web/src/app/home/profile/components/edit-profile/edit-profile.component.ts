import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { countries } from '../../models/countries';
import { ContextService } from '../../../../context/context-service';
import { CandidateProfileService } from '../../services/candidate-profile-service';
import { CandidateProfile, Education, Experience, PreferredModeOfWorking } from '../../models/candidate-profile'
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgSelectModule, BsDatepickerModule, ValidationMessagesComponent]
})
export class EditProfileComponent implements OnInit {
    @Input() candidateProfile: CandidateProfile;
    @Output() onClose = new EventEmitter<boolean>();

    candidateForm: FormGroup;
    todayDate = new Date();
    countries = countries;
    isFormSubmitted: boolean = false;
    workModes = PreferredModeOfWorking.getAll();
    isDisabled = true;

    validationMessages = {
        id: [
            { type: 'required', message: "ID is required" },
        ],
        firstName: [
            { type: 'required', message: "First name is required" },
        ],
        middleName: [
            // No required validator, so no message needed for 'required'
        ],
        lastName: [
            { type: 'required', message: "Last name is required" },
        ],
        email: [
            { type: 'required', message: "Email is required" },
        ],
        phone: [
            { type: 'required', message: "Mobile number is required" },
        ],
        dateOfBirth: [
            // No required validator, so no message needed for 'required'
        ],
        expectedSalary: [
            { type: 'required', message: "Expected salary is required" },
        ],
        currentLocation: [
            { type: 'required', message: "Current location is required" },
        ],
        currentSalary: [
            { type: 'required', message: "Current salary is required" },
        ],
        preferredLocation: {
            locationName: [
                { type: 'required', message: "Preferred location name is required" },
            ],
            preferredModeOfWorking: [
                { type: 'required', message: "Preferred mode of working is required" },
            ],
            willingToRelocate: [
                { type: 'required', message: "Willingness to relocate is required" },
            ],
        },
        address: {
            countryName: [
                { type: 'required', message: "Country name is required" },
            ],
            countryCode: [
                { type: 'required', message: "Country code is required" },
            ],
            state: [
                { type: 'required', message: "State code is required" },
            ],
            city: [
                { type: 'required', message: "City is required" },
            ],
            addressLine1: [
                { type: 'required', message: "Address line 1 is required" },
            ],
            addressLine2: [
                // No required validator, so no message needed for 'required'
            ],
            zip: [
                { type: 'required', message: "Zip code is required" },
            ],
        },
        education: {
            degree: [
                { type: 'required', message: "Degree is required" },
            ],
            specialization: [
                { type: 'required', message: "Specialization is required" },
            ],
            startDate: [
                { type: 'required', message: "Start date is required" },
            ],
            endDate: [
                // No required validator, so no message needed for 'required'
            ],
            score: [
                { type: 'required', message: "Score is required" },
            ],
            institutionName: [
                { type: 'required', message: "Institution name is required" },
            ],
            location: [
                { type: 'required', message: "Education location is required" },
            ],
        },
        experience: {
            companyName: [
                { type: 'required', message: "Company name is required" },
            ],
            designation: [
                { type: 'required', message: "Designation is required" },
            ],
            isCurrentlyWorking: [
                { type: 'required', message: "Is currently working is required" },
            ],
            dateOfJoining: [
                { type: 'required', message: "Date Of Joining is required" },
            ],
            dateOfRelieving: [
                // No required validator, so no message needed for 'required'
            ],
            location: [
                { type: 'required', message: "Experience location is required" },
            ],
            dateOfRelievingValidator : [
                { type: 'dateOfRelievingValidator', message: "Date of Relieving must be after Date of Joining" },
            ]
        }
    };

    get educationFormControls() {
        return (this.candidateForm.get('education') as FormArray).controls;
    }

    get experienceFormControls() {
        return (this.candidateForm.get('experience') as FormArray).controls;
    }

    constructor(private contextService: ContextService,
                private notificationService: NotificationService,
                private candidateProfileService: CandidateProfileService) {}

    ngOnInit(): void {
        this.getCandidateProfile();
    }

    getCandidateProfile() {
        this.buildCandidateForm(this.candidateProfile);
        // this.candidateProfileService.getCandidateDetails().subscribe({
        //     next: (data) => {
        //         this.buildCandidateForm(data);
        //     } 
        // });
    }

    buildCandidateForm(candidateProfile: CandidateProfile) {
        this.candidateForm = new FormGroup({
            id: new FormControl(candidateProfile.id, [Validators.required]),
            firstName: new FormControl(candidateProfile.firstName, [Validators.required]),
            middleName: new FormControl(candidateProfile.middleName),
            lastName: new FormControl(candidateProfile.lastName, [Validators.required]),
            email: new FormControl({ value: candidateProfile.email, disabled: true }, [Validators.required]),
            dateOfBirth: new FormControl(candidateProfile.dateOfBirth),
            phone : new FormControl(candidateProfile.phone),
            expectedSalary: new FormControl(candidateProfile.expectedSalary, [Validators.required]),
            //currentLocation: new FormControl(candidateProfile.currentLocation, [Validators.required]), As we already taking address as input
            currentSalary: new FormControl(candidateProfile.currentSalary, [Validators.required]),
            education: new FormArray(candidateProfile.education.map(education => this.buildEducationForm(education))),
            experience: new FormArray(candidateProfile.experience.map(experience => this.buildExperienceForm(experience))),
            preferredLocation: new FormGroup({
                locationName: new FormControl(candidateProfile.preferredLocation?.locationName, [Validators.required]),
                preferredModeOfWorking: new FormControl(candidateProfile.preferredLocation?.preferredModeOfWorking, [Validators.required]),
                willingToRelocate: new FormControl(candidateProfile.preferredLocation?.willingToRelocate ?? false),
            }),
            address: new FormGroup({
                countryName: new FormControl(candidateProfile.address?.countryName, [Validators.required]),
                countryCode: new FormControl(candidateProfile.address?.countryCode, [Validators.required]),
                state: new FormControl(candidateProfile.address?.state, [Validators.required]),
                city: new FormControl(candidateProfile.address?.city, [Validators.required]),
                addressLine1: new FormControl(candidateProfile.address?.addressLine1, [Validators.required]),
                addressLine2: new FormControl(candidateProfile.address?.addressLine2),
                zip: new FormControl(candidateProfile.address?.zip, [Validators.required]),
            })
        });

        const add = this.candidateForm.get('address.countryCode');
        this.candidateForm.get('address.countryCode').valueChanges.subscribe(countryCode => {
            const countryName = this.countries.find(country => country.id === countryCode)?.name;
            this.candidateForm.get('address.countryName').setValue(countryName);
        });
    }

    buildEducationForm(education: Education | null = null) {
        return new FormGroup({
            degree: new FormControl(education?.degree, [Validators.required]),
            specialization: new FormControl(education?.specialization, [Validators.required]),
            startDate: new FormControl(education?.startDate, [Validators.required]),
            endDate: new FormControl(education?.endDate),
            score: new FormControl(education?.score, [Validators.required]),
            institutionName: new FormControl(education?.institutionName, [Validators.required]),
            location: new FormControl(education?.location, [Validators.required])
        })
    }

    buildExperienceForm(experience: Experience | null = null) {
        return new FormGroup({
            companyName: new FormControl(experience?.companyName, [Validators.required]),
            designation: new FormControl(experience?.designation, [Validators.required]),
            isCurrentlyWorking: new FormControl(experience?.isCurrentlyWorking ?? false, [Validators.required]),
            dateOfJoining: new FormControl(experience?.dateOfJoining, [Validators.required]),
            dateOfRelieving: new FormControl(experience?.dateOfRelieving, []),
            location: new FormControl(experience?.location, [Validators.required])
        })
    }

    addExperience() {
        (this.candidateForm.get('experience') as FormArray).push(this.buildExperienceForm());
    }

    addEducation() {
        (this.candidateForm.get('education') as FormArray).push(this.buildEducationForm());
    }

    getEducationFormAt(index: number) {
        return (this.candidateForm.get('education') as FormArray).at(index);
    }

    getExperienceFormAt(index: number) {
        return (this.candidateForm.get('experience') as FormArray).at(index);
    }

    removeAt(index: number, formArrayName: string) {
        (this.candidateForm.get(formArrayName) as FormArray).removeAt(index);
    }

    dateOfRelievingValidator(control: AbstractControl): ValidationErrors | null {
        const isCurrentlyWorking = control?.get('isCurrentlyWorking')?.value;
        const dateOfRelieving = control?.get('dateOfRelieving')?.value;
        if(isCurrentlyWorking === false && dateOfRelieving === null) {
            return { invalidRelievingDate : true }
        }
        return null;
    }

    cancel() {
        this.onClose.emit(false);
    }

    save() {
        this.isFormSubmitted = true;
        if(this.candidateForm.valid) {
            const candidateProfile = new CandidateProfile(this.candidateForm.value);
            candidateProfile.email = this.candidateProfile.email;
            candidateProfile.phone = candidateProfile.phone.toString();
            this.candidateProfileService.updateCandidateDetails(this.contextService.getUser().profileId, candidateProfile).subscribe({
                next: (data) => {
                    this.onClose.emit(true);
                },
                error: (error) => {
                    this.notificationService.error("Error", error?.message ?? "Error Updating candidate profile.");
                }
            })
        }
    }

}
