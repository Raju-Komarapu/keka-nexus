import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from './user';

@Injectable({
    providedIn: 'root'
})
export class ContextService {
    private user: User;
    private apiUrl: string = '/api/context'
    constructor(private httpClient: HttpClient) { }

    initialize(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.httpClient.get<User>(this.apiUrl).subscribe({
                next: (data) => {
                    this.user = data;
                    resolve(true);
                },
                error: (error) => reject()
            })
        })
    }

    getUser = () => this.user;
}
