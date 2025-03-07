import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';
import { ContextService } from '../../../context/context-service';

@Component({
    selector: 'top-nav',
    templateUrl: './top-nav.component.html',
    standalone: true,
    imports: [NgIf, RouterModule]
})
export class TopNavComponent implements OnInit {
    constructor(private contextService: ContextService,
                private authService: AuthService) {
    }

    get displayName() {
        return this.contextService.getUser()?.displayName;
    }

    get isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    ngOnInit() {
    }
}
