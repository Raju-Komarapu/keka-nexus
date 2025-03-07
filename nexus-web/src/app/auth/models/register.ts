export class Register {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
  
    constructor(args) {
      this.firstName = args.firstName;
      this.lastName = args.lastName;
      this.phone = args.phone;
      this.email = args.email;
      this.password = args.password;
      this.confirmPassword = args.confirmPassword;
    }
  }