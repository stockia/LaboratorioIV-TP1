import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class EdadValidator {
  // Verifica si la edad está entre 18 y 99
  static validarEdad(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const edad = control.value;
      
      if (edad >= 18 && edad <= 99) {
        return null;
      } else {
        return { edadInvalida: true };
      }
    };
  }
}
