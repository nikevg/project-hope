import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { DialogComponent } from './dialog/dialog.component';
import { MessageComponent } from './message/message.component';
import { TemplatesService } from './services/templates.service';
import { LoggerService } from './services/logger.service';
import { MessageService } from './services/message.service';
import { UsersService } from './services/users.service';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthGuard } from './guards/auth.guard';

const MaterialComponents = [
  MatButtonModule,
  MatDialogModule,
  MatSnackBarModule,
];

const InterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  },
];

@NgModule({
  declarations: [DialogComponent, MessageComponent],
  imports: [
    MaterialComponents,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  exports: [DialogComponent, MessageComponent],
  providers: [
    TemplatesService,
    LoggerService,
    MessageService,
    UsersService,
    AuthGuard,
    InterceptorProviders,
  ],
})
export class SharedModule {}
