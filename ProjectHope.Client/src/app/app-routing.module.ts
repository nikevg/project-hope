import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemplatesComponent } from './templates/templates.component';
import { TemplateComponent } from './templates/template/template.component';
import { CanDeactivateTemplateGuard } from './templates/template/can-deactivate-template.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignUpComponent } from './users/sign-up/sign-up.component';
import { SignInComponent } from './users/sign-in/sign-in.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
    data: { animation: 'HomePage' },
  },
  {
    path: 'templates',
    component: TemplatesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { animation: 'TemplatesPage' },
  },
  {
    path: 'templates/:id',
    component: TemplateComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateTemplateGuard],
    data: { animation: 'TemplatePage' },
  },
  {
    path: 'users/sign-up',
    component: SignUpComponent,
    pathMatch: 'full',
    data: { animation: 'SignUpPage' },
  },
  {
    path: 'users/sign-in',
    component: SignInComponent,
    pathMatch: 'full',
    data: { animation: 'SignInPage' },
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
