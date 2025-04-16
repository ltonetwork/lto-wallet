import { UntypedFormGroup, ValidationErrors } from '@angular/forms';

export function formControlErrors(
  form: UntypedFormGroup | null,
  controlName: string
): ValidationErrors | null {
  const control = form ? form.get(controlName) : null;
  if (control && control.dirty && control.touched) {
    return control.errors;
  }

  return null;
}
