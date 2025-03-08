import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/components/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { ProfileComponent } from './home/profile/profile.component';
import { authGuard } from './auth/route-guards/auth-guard';
import { AllJobsComponent } from './shared/components/all-jobs/all-jobs.component';
import { JobComponent } from './home/job/job.component';
import { LogoutComponent } from './auth/components/logout/logout.component';
import { MyApplicationsComponent } from './home/my-applications/my-applications.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'home', component: HomeComponent,
      children: [
            { 
                path: '', component: AllJobsComponent
            },
            {
                path: 'profile', component: ProfileComponent, canActivate: [authGuard]
            },
            {
                path: 'job/:jobId', component: JobComponent
            },
            {
                path: 'my-applications', component: MyApplicationsComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
