import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public auth: Auth) { }

  get currentUser() {
    return this.auth.currentUser;
  }

  get userEmail() {
    return this.auth.currentUser?.email;
  }
}
