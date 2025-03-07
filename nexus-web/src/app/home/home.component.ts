import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopNavComponent } from '../shared/components/top-nav/top-nav.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [TopNavComponent, RouterModule]
})
export class HomeComponent {

}
