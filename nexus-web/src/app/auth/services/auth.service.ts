import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { AuthResponse } from '../models/auth-response';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl: string = '/api/auth'
    private TOKEN_KEY = 'auth_token';

    constructor(private router: Router, private httpClient: HttpClient) { }
    
    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    logout(): void {
        this.removeToken();
        this.router.navigate(['/login']);
    }

    hasToken(): boolean {
        return !!this.getToken();
    }

    login(loginModal: Login): Observable<AuthResponse> {
        return this.httpClient.post<AuthResponse>(`${this.apiUrl}/login`, loginModal);
    }

    register(registerModal: Register): Observable<AuthResponse> {
        return this.httpClient.post<AuthResponse>(`${this.apiUrl}/register`, registerModal);
    }
}
