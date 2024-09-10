import { Component } from '@angular/core';

@Component({ 
  selector: 'not-found', 
  templateUrl: './not-found.component.html', 
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent { 
  errorMessage: string = ''; 

  constructor() {
    this.errorMessage = 'Error al iniciar sesión o al intentar registrarse';
  }

  getErrorMessage() {
    return this.errorMessage;
  }
}