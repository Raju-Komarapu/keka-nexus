import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private loaderSubject = new BehaviorSubject<boolean>(false);
    loader$ = this.loaderSubject.asObservable();
    private requestCount = 0;

    show() {
        this.requestCount++;
        this.loaderSubject.next(true);
    }

    hide() {
        this.requestCount--;
        if (this.requestCount === 0) {
            this.loaderSubject.next(false);
        }
    }
}
