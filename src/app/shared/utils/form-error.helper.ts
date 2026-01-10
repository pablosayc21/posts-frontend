import { AbstractControl } from '@angular/forms';

export function getFormError(control: AbstractControl | null | undefined): string {
  if (!control || !control.errors || !control.touched) return '';

  const errors = control.errors;
  let msg = '';

  for (const key in errors) {
    const val = errors[key];
    switch (key) {
      case 'required':
        msg += 'Campo requerido ';
        break;
      case 'minlength':
        msg += `Mínimo ${val.requiredLength} caracteres `;
        break;
      case 'maxlength':
        msg += `Máximo ${val.requiredLength} caracteres `;
        break;
      case 'email':
        msg += 'Formato de email incorrecto ';
        break;
      case 'pattern':
        msg += 'Formato de texto incorrecto ';
        break;
      case 'validateError':
        msg += `${val} `;
        break;
      case 'min':
        msg += `Valor mínimo ${val.min} `;
        break;
      case 'max':
        msg += `Valor máximo ${val.max} `;
        break;
      default:
        msg += `${val} `;
        break;
    }
  }

  return msg.trim();
}