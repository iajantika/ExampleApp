import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserServiceService);
  return userService.isLoggedIn();
};
