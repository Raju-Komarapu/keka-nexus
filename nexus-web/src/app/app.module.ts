import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        // ToastrModule.forRoot({
        //     positionClass: 'toast-top-right',
        //     timeOut: 3000000,
        //     extendedTimeOut: 3000000,
        //     preventDuplicates: true
        // }),
        ToastrModule.forRoot({
            positionClass: 'toast-top-right',
            timeOut: 0,               // Toast will not auto-dismiss
            extendedTimeOut: 0,       // Extended timeout is also disabled
            preventDuplicates: true,
            tapToDismiss: false,      // Prevent accidental dismissal on click
            closeButton: true         // Provide a close button for manual dismissal
        }),
        HttpClientModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
