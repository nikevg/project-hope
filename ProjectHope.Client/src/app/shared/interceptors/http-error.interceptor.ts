import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { LoggerService } from '../services/logger.service';
import { MessageService } from '../services/message.service';
import { UsersService } from '../services/users.service';
import { MessageType } from '../message/message-type';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private logger: LoggerService,
    private messenger: MessageService,
    private userService: UsersService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = error.error.message;
        } else {
          // server-side error
          if (error.status === 404) {
            // redirect on not-found page
            this.router.navigate(['/not-found']);
          } else if (error.status === 401) {
            this.userService.token = null;
            this.router.navigate(['/']);
          }

          errorMessage = error.message;
        }

        // logging
        this.logger.error(errorMessage);

        // message for user (no message if redirect)
        if (error.status !== 404) {
          this.messenger.send({
            // TODO: localize
            value:
              'An error occurred while sending a request to the server. Please try again',
            type: MessageType.Error,
          });
        }

        return throwError(errorMessage);
      })
    );
  }
}
