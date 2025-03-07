import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ValidationMessagesComponent } from '../../../shared/components/validation-messages/validation-messages.component';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, ValidationMessagesComponent]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    isFormSubmitted: boolean = false;
    isInProgress: boolean = false;
    validationMessages = {
        email: [
            { type: 'required', message: "Email is required" },
        ],
        password: [
            { type: 'required', message: "Password is required" },
            { type: 'minlength', message: "Minimum 8 characters required" },
        ]
    }

    constructor(private authService: AuthService, private notificationService: NotificationService, private router: Router) {}

    ngOnInit(): void {
        if(this.authService.isLoggedIn()) {
            this.router.navigate(['/home']);
        }

        this.initializeLoginForm();
    }

    initializeLoginForm() {
        this.loginForm = new FormGroup({
            email: new FormControl(null, [Validators.required]),
            password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        });
    }

    login() {
        this.isFormSubmitted = true;
        const loginModal = this.loginForm.value;
        this.isInProgress = true;
        this.authService.login(loginModal).subscribe({
            next: (token) => {
                this.authService.setToken(token);
                this.router.navigate(['/home']);
            },
            error: (err) => {
                this.notificationService.error("Error", err?.message ?? "Error logging in")
            }
        }).add(() => this.isInProgress = false)
    }
}
