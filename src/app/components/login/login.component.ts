import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  isLoading: boolean = false;

  constructor(private router: Router) {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  login(username: string, password: string) {
    this.username = username;
    this.password = password;

    if (this.validate(this.username, this.password)) {
      setTimeout(() => {
        this.isLoading = true;
      });
      this.isLoading = false;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
    }

    this.goTo('home');
  }

  signUp(username: string, password: string) {
    // a definir
  }

  // valida de forma ficticia el username y password
  validate(username: string, password: string) {
    return username === 'superUser' && password === '12345';
  }

  // funcion con propositos de test
  autocomplete() {
    this.username = 'superUser';
    this.password = '12345';
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
