import { AbstractControl, ValidatorFn, ValidationErrors, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class CustomValidators {
  static confirmPasswordValidator(): ValidatorFn | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordControl = control.get('password');
      const confirmPasswordControl = control.get('confirmPassword');

      if (!passwordControl || !confirmPasswordControl) {
        return null; // Controls not found in form group
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      }
      else {
        confirmPasswordControl.setErrors(null);
      }
      return null;
    };
  }
  static marksRangeValidator(control: FormControl) {
    const value = control.value;
    if (value < 0 || value > 100) {
      control.setErrors({ marksRange: true });
      return { marksRange: true };
    }
    else {
      control.setErrors(null);
    }
    return null;
  }
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}