import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';

import { TemplatesComponent } from './templates.component';
import { TemplateComponent } from './template/template.component';
import { CanDeactivateTemplateGuard } from './template/can-deactivate-template.guard';

const MaterialComponents = [
  MatTableModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatTabsModule,
  MatDividerModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatBadgeModule,
];

@NgModule({
  declarations: [TemplatesComponent, TemplateComponent],
  imports: [MaterialComponents, ReactiveFormsModule, CommonModule],
  exports: [TemplatesComponent, TemplateComponent],
  providers: [CanDeactivateTemplateGuard],
})
export class TemplatesModule {}
