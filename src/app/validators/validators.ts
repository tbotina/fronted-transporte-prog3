// validators.ts
import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Validador personalizado para asegurar que un array no esté vacío.
 */
export function nonEmptyArrayValidator(control: AbstractControl): ValidationErrors | null {
  if (Array.isArray(control.value) && control.value.length > 0) {
    return null;  // Es válido
  } else {
    return { nonEmptyArray: true };  // No es válido
  }
}
