import { Enum } from "../../../shared/models/enums.model"

export class CandidateProfile {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    expectedSalary: string;
    currentSalary: string;
    address: Address;
    currentLocation: string;
    preferredLocation: PreferredLocation;
    experience: Experience[];
    education: Education[];
    resumeLocation: string;
    isProfileUpdated: boolean;

    constructor(args: any) {
        this.id = args.id;
        this.firstName = args.firstName;
        this.middleName = args.middleName ?? null;
        this.lastName = args.lastName;
        this.email = args.email;
        this.phone = args.phone;
        this.dateOfBirth = args.dateOfBirth;
        this.expectedSalary = args.expectedSalary;
        this.currentSalary = args.currentSalary;
        this.address = args.address ? new Address(args.address) : null;
        this.currentLocation = args.currentLocation;
        this.preferredLocation = args.preferredLocation ? new PreferredLocation(args.preferredLocation) : null;
        this.experience = args.experience ? args.experience.map(exp => new Experience(exp)) : [];
        this.education = args.education ? args.education.map(edu => new Education(edu)) : [];
        this.resumeLocation = args.resumeLocation ?? null;
        this.isProfileUpdated = args.isProfileUpdated;
    }
}

export class Address {
    addressLine1: string;
    addressLine2: string;
    countryCode: string;
    city: string;
    state: string;
    zip: string;
    countryName: string;

    constructor(args: any) {
        this.addressLine1 = args.addressLine1;
        this.addressLine2 = args.addressLine2;
        this.countryCode = args.countryCode;
        this.city = args.city;
        this.state = args.state;
        this.zip = args.zip;
        this.countryName = args.countryName;
    }
}

export class Experience {
    companyName: string;
    designation: string;
    isCurrentlyWorking: boolean;
    dateOfJoining: Date;
    dateOfRelieving: Date | null;
    location: string;

    constructor(args: any) {
        this.companyName = args.companyName;
        this.designation = args.designation;
        this.isCurrentlyWorking = args.isCurrentlyWorking;
        this.dateOfJoining = args.dateOfJoining;
        this.dateOfRelieving = args.dateOfRelieving;
        this.location = args.location;
    }
}

export class Education {
    degree: string;
    specialization: string;
    startDate: Date;
    endDate: Date | null;
    score: string;
    institutionName: string;
    location: string;

    constructor(args: any) {
        this.degree = args.degree;
        this.specialization = args.specialization;
        this.startDate = args.startDate;
        this.endDate = args.endDate;
        this.score = args.score;
        this.institutionName = args.institutionName;
        this.location = args.location;
    }
}

export class PreferredLocation {
    willingToRelocate: boolean;
    locationName: string;
    preferredModeOfWorking: number;

    constructor(args: any) {
        this.willingToRelocate = args.willingToRelocate;
        this.locationName = args.locationName;
        this.preferredModeOfWorking = args.preferredModeOfWorking;
    }
}

  export class PreferredModeOfWorking extends Enum{
    static Remote = 1;
    static Hybrid = 2;
    static OnSite = 3;
    static Flexible = 4;
    static 1 = 'Remote';
    static 2 = 'Hybrid';
    static 3 = 'OnSite';
    static 4 = 'Flexible';
  }