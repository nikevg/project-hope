import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Subscription } from 'rxjs';

import { TemplatesService } from '../shared/services/templates.service';
import { UsersService } from '../shared/services/users.service';
import { Template } from '../shared/models/templates/template';
import {
  inOutAnimation,
  enterLeaveAnimation,
} from '../shared/theming/animation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [enterLeaveAnimation, inOutAnimation],
})
export class DashboardComponent implements OnInit, OnDestroy {
  cols: number;
  isLoadingResults: boolean = false;

  templates: Template[];

  templatesSubscription: Subscription;
  breakpointObserverSubscription: Subscription;

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private templatesService: TemplatesService,
    public userService: UsersService
  ) {}

  ngOnInit(): void {
    this.breakpointObserverSubscription = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .subscribe((state) => {
        this.cols = state.matches ? 1 : 3;
      });

    if (!this.userService.token) {
      return;
    }

    this.get();
  }

  ngOnDestroy(): void {
    if (this.templatesSubscription) {
      this.templatesSubscription.unsubscribe();
      this.templatesSubscription = null;
    }

    if (this.breakpointObserverSubscription) {
      this.breakpointObserverSubscription.unsubscribe();
      this.breakpointObserverSubscription = null;
    }
  }

  get(): void {
    this.isLoadingResults = true;
    this.templatesSubscription = this.templatesService.get(0, 3).subscribe(
      (res) => {
        this.isLoadingResults = false;
        this.templates = res.data;
      },
      (_) => (this.isLoadingResults = false)
    );
  }

  open(template: Template): void {
    this.router.navigate([`templates/${template.id}`]);
  }
}
