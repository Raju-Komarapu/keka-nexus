import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { Register } from '../models/register';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl: string = '/auth'
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

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    login(loginModal: Login): Observable<string> {
        return this.httpClient.post<string>(`${this.apiUrl}/login`, loginModal);
    }

    register(registerModal: Register): Observable<string> {
        return this.httpClient.post<string>(`${this.apiUrl}/register`, registerModal);
    }
}
