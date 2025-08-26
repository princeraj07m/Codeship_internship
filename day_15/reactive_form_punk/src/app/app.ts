import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html'
})
export class AppComponent {
  form: FormGroup;


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['',
        [Validators.required, Validators.minLength(3)],
        [this.usernameValidator()]
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      age: [null, [Validators.min(18), Validators.max(99)]],
      website: ['', [Validators.pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)]],
      birthDate: ['', [this.dateValidator.bind(this)]],
      phone: ['', [Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      agreeTerms: [false, Validators.requiredTrue],
      subscriptionType: ['', Validators.required],
      customField: ['', [this.customValidator.bind(this)]],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        zip: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
      }),
      preferredColors: this.fb.array([
        this.fb.control('#ffffff')
      ], [Validators.required, Validators.minLength(2)])
    });
  }



  dateValidator(control: AbstractControl): ValidationErrors | null {
    const date = new Date(control.value);
    return date > new Date() ? { futureDate: true } : null;
  }

  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value === 'admin' ? { usernameTaken: true } : null)
        .pipe(map(res => res));
    };
  }

  customValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return value && value.includes('example') ? { containsExample: true } : null;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    }
  }
}