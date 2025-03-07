import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ValidationMessagesComponent } from '../../../shared/components/validation-messages/validation-messages.component';
import { NotificationService } from '../../../shared/services/notification.service';
import { Register } from '../../models/register';
import { AuthResponse } from '../../models/auth-response';
import { ContextService } from '../../../context/context-service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, ValidationMessagesComponent, RouterModule]
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    isFormSubmitted: boolean = false;
    isInProgress: boolean = false;
    validationMessages = {
        firstName: [
            { type: 'required', message: "First name is required" },
        ],
        lastName: [
            { type: 'required', message: "Last name is required" },
        ],
        phone: [
            { type: 'required', message: "Phone Number is required" },
            { type: 'pattern', message: "Invalid Phone Number" }
        ],
        email: [
            { type: 'required', message: "Email is required" },
        ],
        password: [
            { type: 'required', message: "Password is required" },
            { type: 'minlength', message: "Minimum 8 characters required" },
        ],
        confirmPassword: [
            { type: 'required', message: "Confirm Password is required" },
            { type: 'minlength', message: "Minimum 8 characters required" },
        ]
    }

    constructor(private authService: AuthService,
        private notificationService: NotificationService,
        private router: Router,
        private contextService: ContextService) { }

    ngOnInit(): void {
        if (this.authService.hasToken()) {
            this.router.navigate(['/home']);
        }

        this.initializeLoginForm();
    }

    initializeLoginForm() {
        this.registerForm = new FormGroup({
            firstName: new FormControl(null, [Validators.required]),
            lastName: new FormControl(null, [Validators.required]),
            phone: new FormControl(null, [Validators.required, Validators.pattern(/^\d{10}$/)]),
            email: new FormControl(null, [Validators.required]),
            password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
            confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        });
    }

    confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
        const password = this.registerForm.get('password')?.value;
        return control.value === password ? null : { invalidPassword: true };
    }

    register() {
        this.isFormSubmitted = true;
        const registerModal = new Register(this.registerForm.value);
        this.isInProgress = true;
        this.authService.register(registerModal).subscribe({
            next: (response: AuthResponse) => {
                if (!response.succeeded) {
                    this.notificationService.error("Error", response.message);
                    return;
                }
                this.authService.setToken(response.token);
                this.contextService.initialize().then((result: boolean) => {
                    if (result) {
                        this.router.navigate(['/home']);
                    }
                }).catch((error) => {
                    this.notificationService.error("Error", error?.message ?? "Error getting context")
                });
            },
            error: (err) => {
                this.notificationService.error("Error", err?.message ?? "Error signing in")
            }
        }).add(() => this.isInProgress = false)
    }
}
