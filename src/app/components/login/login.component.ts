import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userMail: string = '';
  userPwd: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, public auth: Auth, private firestore: Firestore) {
  }

  async login() {
    signInWithEmailAndPassword(this.auth, this.userMail, this.userPwd)
    .then(res => {
      this.registerLogin();
      this.goTo('home');
      console.log(`Usuario logueado: ${this.auth.currentUser?.email}`);
    })
    .catch(error => {
      console.log(error);
    })
  }

  async registerLogin() {
    try {
      this.isLoading = true;
      let collectionDB = collection(this.firestore, 'logins');
      await addDoc(collectionDB, { fecha: new Date(), 'user': this.userMail });
      this.isLoading = false;
    } catch (error) {
      console.log(error);
    }
  }

  signUp() {
    this.goTo('register');
  }

  // funcion con propositos de test
  autocomplete() {
    this.userMail = 'invitado@juegardopolis.com';
    this.userPwd = 'hola12345';
    // otro user
    // this.userMail = 'admin@utn.com';
    // this.userPwd = 'admin12345';
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
