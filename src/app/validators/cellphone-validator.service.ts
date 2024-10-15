import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CellphoneValidator {
    // Verifica que el celular tenga 10 digitos 
    static validarCelular(): ValidatorFn {
        // tambien debe verificar que este compuesto por numeros
        return (control: AbstractControl): ValidationErrors | null => {
            const celular = control.value;
            const celularLen = celular.toString().length;
            debugger;
            if (celularLen === 10) {
                return null;
            } else {
                return { celularInvalido: true };
            }
        };
    }
}
