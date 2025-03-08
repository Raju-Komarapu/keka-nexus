import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AuthService } from '../../../auth/services/auth.service';
import { ContextService } from '../../../context/context-service';

@Component({
    selector: 'top-nav',
    templateUrl: './top-nav.component.html',
    standalone: true,
    imports: [NgIf, RouterModule, BsDropdownModule ],
    styles: [`
    .dropdown-menu {
        min-width: 200px;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      }
      
      .dropdown-menu li:hover {
        background-color: #f8f9fa;
      }
      `]
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
