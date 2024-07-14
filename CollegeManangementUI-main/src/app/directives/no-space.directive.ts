import { Directive, ElementRef, HostListener } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appNoSpace]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NoSpaceDirective, multi: true }]
})
export class NoSpaceDirective implements Validator {

  constructor(private el: ElementRef) { }

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && value.includes(' ')) {
      return { 'noSpace': true };
    }
    return null;
  }

  @HostListener('input', ['$event'])
  onInputChange(event: InputEvent): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\s/g, '');
  }
}
