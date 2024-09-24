import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  // Si le ponemos 'prefix' nos va a arrojar un error en la consola de redireccion infinita
  // { path: '', redirectTo: '/home', pathMatch: "full" },
  { path: '', redirectTo: '/login', pathMatch: "full" },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'games',
    loadChildren: () => import('./games/games.module').then(m => m.GamesModule)
  },
  { path: '**', component: NotFoundComponent },
];