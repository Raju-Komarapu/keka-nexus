import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'job-applied-confirmation',
    templateUrl: './job-applied-confirmation.component.html',
    standalone: true,
    imports: []
})
export class JobAppliedConfirmation {
    private screeningUrl="https://tharungade.in";
    screeningQuestionsWindow: Window;

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
      console.log(this.screeningQuestionsWindow);
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