export class Login {
    email: string;
    password: string;
  
    constructor(args) {
      this.email = args.email;
      this.password = args.password;
    }
  }