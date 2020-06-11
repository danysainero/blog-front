import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})

export class ErrorMessageComponent implements OnInit, AfterViewInit {

  // tslint:disable-next-line: no-input-rename
  @Input('control') control: FormControl;
  // tslint:disable-next-line: no-input-rename
  @Input('customErrors') customErrors: object = {};
  errorMessages: object;

  constructor() { }

  ngOnInit() {
    this.errorMessages = {
      required: 'This field must not be empty',
      minlength: 'Sorry, this field is too short',
      maxlength: 'Sorry, this field is too long',
      pattern: 'Sorry, this is not valid'
    };
  }
  ngAfterViewInit() {
    Object.keys(this.customErrors).forEach((errorType) => {
    this.errorMessages[errorType] = this.customErrors[errorType];
    });
  }
  get errorMessage() {
    for (const error in this.control.errors) {
      if (this.control.errors.hasOwnProperty(error)
        && (this.control.touched || (this.control.asyncValidator !== null
          && !this.control.pristine))) {
            return this.errorMessages[error];
      }
    }
    return null;
  }
}

