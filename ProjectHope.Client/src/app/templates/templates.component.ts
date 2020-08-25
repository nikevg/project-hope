import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { Subscription, Subject } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Template } from '../shared/models/templates/template';
import { TemplatesService } from '../shared/services/templates.service';
import {
  enterLeaveAnimation,
  inOutAnimation,
} from '../shared/theming/animation';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
  animations: [enterLeaveAnimation, inOutAnimation],
})
export class TemplatesComponent implements OnInit, OnDestroy {
  isLoadingResults: boolean = false;

  displayedColumns: string[] = ['name', 'description'];

  templates: Template[];

  filterValue: string;
  filterSubject = new Subject<string>();

  templatesSubscription: Subscription;
  filterSubscription: Subscription;
  dialogSubscription: Subscription;

  paginatorLength: number = 0;
  paginatorSize = 10;
  paginatorSizeOptions: number[] = [10, 25, 50];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private templatesService: TemplatesService
  ) {}

  ngOnInit(): void {
    this.get(0, this.paginatorSize);

    this.filterSubscription = this.filterSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap((value) => {
          this.get(0, this.paginatorSize, value);

          this.filterValue = value;
          this.paginator.pageIndex = 0;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.templatesSubscription) {
      this.templatesSubscription.unsubscribe();
      this.templatesSubscription = null;
    }

    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
      this.filterSubscription = null;
    }
  }

  get(skip: number, take: number, filter?: string): void {
    this.isLoadingResults = true;
    this.templatesSubscription = this.templatesService
      .get(skip, take, filter)
      .subscribe(
        (res) => {
          this.paginatorLength = res.count;
          this.templates = res.data;
        },
        (_) => (this.isLoadingResults = false),
        () => (this.isLoadingResults = false)
      );
  }

  open(template: Template): void {
    this.router.navigate([`${template.id}`], { relativeTo: this.route });
  }

  add(): void {
    this.router.navigate([`new`], { relativeTo: this.route });
  }

  filter(value: string) {
    this.filterSubject.next(value.trim().toLowerCase());
  }

  onPage(page: PageEvent) {
    this.paginatorSize = page.pageSize;

    this.get(page.pageIndex * page.pageSize, page.pageSize, this.filterValue);
  }
}
