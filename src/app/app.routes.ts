import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './guards/auth-guard.guard';
import { RankListComponent } from './components/rank-list/rank-list.component';
import { FormComponent } from './components/form/form.component';

export const routes: Routes = [
  // Si le ponemos 'prefix' nos va a arrojar un error en la consola de redireccion infinita
  // { path: '', redirectTo: '/home', pathMatch: "full" },
  { path: '', redirectTo: '/login', pathMatch: "full" },
  { path: 'login', component: LoginComponent},
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'form',
    component: FormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'rank-list',
    component: RankListComponent,
    canActivate: [authGuard]
  },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'games',
    canActivateChild: [authGuard],
    loadChildren: () => import('./games/games.module').then(m => m.GamesModule)
  },
  { path: '**', component: NotFoundComponent },
];