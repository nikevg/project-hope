import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';

import { DashboardComponent } from './dashboard.component';

const MaterialComponents = [
  MatGridListModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatRippleModule,
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [MaterialComponents, CommonModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
