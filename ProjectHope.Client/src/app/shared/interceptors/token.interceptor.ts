import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { UsersService } from '../services/users.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userService: UsersService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.userService.token !== null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.userService.token}`,
        },
      });
    }

    return next.handle(request);
  }
}
