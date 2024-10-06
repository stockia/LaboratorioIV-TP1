import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user-service.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
export const authGuard: CanActivateFn = (route, state) => {
  const userService: UserService = inject(UserService);
  const router: Router = inject(Router);
  
  if (userService.currentUser) {
    console.log('User is logged in');
    return true;
  } else {
    console.log('User is not logged in');
    router.navigate(['/login']);
    return false;
  }
};
