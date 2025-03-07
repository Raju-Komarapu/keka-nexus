import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContextService } from '../context/context-service';
import { TopNavComponent } from '../shared/components/top-nav/top-nav.component';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [TopNavComponent, RouterModule]
})
export class HomeComponent implements OnInit {
    constructor(private contextService: ContextService,
                private notificationService: NotificationService) {}
    
    ngOnInit(): void {
      this.contextService.initialize();
    }
}
