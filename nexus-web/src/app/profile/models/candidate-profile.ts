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
    preferredLocation: string
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
  