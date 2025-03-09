import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContextService } from '../context/context-service';
import { TopNavComponent } from '../shared/components/top-nav/top-nav.component';
import { AuthService } from '../auth/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [TopNavComponent, RouterModule, NgIf]
})
export class HomeComponent implements OnInit {
    isContextInitilized: boolean;
    constructor(private contextService: ContextService,
                private authService: AuthService) {}
    
    ngOnInit(): void {
       if (this.authService.hasToken()) {
           this.contextService.initialize().then(() => this.isContextInitilized = true);
       }
    }
}
