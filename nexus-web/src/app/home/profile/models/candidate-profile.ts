import { Enum } from "../../../shared/models/enums.model"

export class CandidateProfile {
    id: number
    firstName: string
    middleName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
    expectedSalary: string
    currentSalary: string
    address: Address
    currentLocation: string
    preferredLocation: PreferredLocation
    experience: Experience[]
    education: Education[]
    resumeLocation: string
  }
  
  export interface Address {
    addressLine1: string
    addressLine2: string
    countryCode: string
    city: string
    state: string
    zip: string
    countryName: string
  }
  
  export interface Experience {
    companyName: string
    designation: string
    isCurrentlyWorking: boolean
    dateOfJoining: string
    dateOfRelieving: string
    location: string
  }
  
  export interface Education {
    degree: string
    specialization: string
    startDate: string
    endDate: string
    score: string
    institutionName: string
    location: string
  }
  
  export class PreferredLocation {
    willingToRelocate: boolean;
    locationName: string;
    preferredModeOfWorking: PreferredModeOfWorking;
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