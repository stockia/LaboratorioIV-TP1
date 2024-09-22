import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router, public auth: Auth){}

  logout() {
    signOut(this.auth)
    .then(res => {
      this.goTo('login');
    })
  }

  get isLoggedIn(): boolean {
    return this.auth.currentUser !== null;
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
