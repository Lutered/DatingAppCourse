import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs';
import { User } from '../_models/user';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);
  const setAuthToken = (request: HttpRequest<unknown>, user: User | null) => {
    if(!user) return request;

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    });

    return request;
  };

  accountService.currentUser$.pipe(take(1)).subscribe({
    next: user => {
      req = setAuthToken(req, user);
    }
  });

  return next(req);
};
