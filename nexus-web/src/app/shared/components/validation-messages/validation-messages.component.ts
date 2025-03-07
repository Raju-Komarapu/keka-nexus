import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'validation-messages',
    templateUrl: './validation-messages.component.html',
    standalone: true,
    imports: [NgFor, NgIf]
})
export class ValidationMessagesComponent implements OnInit {

    @Input() validationMessages: any;
    @Input() formController: AbstractControl;
    @Input() isFormSubmitted: boolean;
    @Input() textStyle: string = "text-danger";

    constructor() {
    }

  ngOnInit() {
  }
}
