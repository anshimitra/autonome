import { PLATFORM_ID, afterNextRender, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    if (authService.user !== null && authService.user?.role == 10) {
      return true;
    } else if (authService.user !== null && authService.user.role == 11) {
      return true;
    } else {
      inject(Router).navigate(['login']);
      return false;
    }
  }
  inject(Router).navigate(['login']);
  return false;
};
