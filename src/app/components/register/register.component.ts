import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  newUserMail: string = '';
  newUserPwd: string = '';
  flagError: boolean = false;
  msjError: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, public auth: Auth) {}

  register() {
    this.flagError = false;
    this.isLoading = true;
    createUserWithEmailAndPassword(this.auth, this.newUserMail, this.newUserPwd)
    .then((res) => {
      if (res.user.email !== null) {
        this.flagError = false;
        this.isLoading = false;

        this.goTo('home');
      }
    }).catch(error => {
      this.flagError = true;

      switch (error.code) {
        case "auth/invalid-email":
          this.msjError = "Email invalido";
          break;
        case "auth/email-already-in-use":
          this.msjError = "Email ya en uso";
          break;
        default:
          this.msjError = error.code;
          break;
      }
    })
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
