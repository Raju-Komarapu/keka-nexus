import { NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'job-applied-confirmation',
    templateUrl: './job-applied-confirmation.component.html',
    standalone: true,
    imports: [NgIf]
})
export class JobAppliedConfirmation implements OnInit{
    private screeningUrl="https://interview.screeners.ai/signin/67b2e10f60c1598cdd873d14";
    screeningQuestionsWindow: Window;
    isRequestInProgress: boolean;
    processStepIndex: number;
    intervalId: any;
    processSteps = [
      'Submitting your application...',
      'Reviewing your application...',
      "Congratulations! You've been shortlisted!"
    ]

    ngOnInit(): void {
      this.isRequestInProgress = true;
      this.processStepIndex = 0;
      this.intervalId = setInterval(() => { 
        this.processStepIndex = (this.processStepIndex + 1) % 3 
        if(this.processStepIndex == 2)
        {
          this.isRequestInProgress = false;
          clearInterval(this.intervalId)
        }
      }, 2000);
    }

    sendConfirmation: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
      private modalref: BsModalRef,
      private notificationService: NotificationService,
    ) {}
    
    openScreeningWindow() {
      const windowFeature = 'width=1200,height=800,left=200,top=200';
      this.screeningQuestionsWindow = window.open(this.screeningUrl, '', windowFeature);
      this.checkWindowStatus();
    }

    checkWindowStatus() {
      if (!this.screeningQuestionsWindow.closed) {
          setTimeout(() => { this.checkWindowStatus(); }, 100);
      } else {
          this.sendConfirmation.emit(true);
          this.closeModal();
      }
    }

    closeModal() {
      this.modalref?.hide();
    }
  }