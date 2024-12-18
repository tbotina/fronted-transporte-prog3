import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private variableSource = new BehaviorSubject<string>('Valor inicial'); // Valor inicial de la variable
  currentVariable = this.variableSource.asObservable(); // Exponer el valor como observable

  constructor() { }

  // Método para cambiar el valor
  changeVariable(newVariable: string) {
    this.variableSource.next(newVariable);
  }
}
