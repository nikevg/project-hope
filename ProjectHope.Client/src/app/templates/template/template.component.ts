import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Subscription } from 'rxjs';

import { Template } from '../../shared/models/templates/template';
import { TemplatesService } from '../../shared/services/templates.service';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import {
  enterLeaveAnimation,
  inOutAnimation,
  expandAnimation,
} from '../../shared/theming/animation';
import { ValueType } from 'src/app/shared/models/types/value-type';
import { Property } from 'src/app/shared/models/templates/property';
import { Element } from 'src/app/shared/models/templates/element';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  animations: [enterLeaveAnimation, inOutAnimation, expandAnimation],
})
export class TemplateComponent implements OnInit, OnDestroy {
  // TODO: in template dto
  isFavorite: boolean = false;

  isNew: boolean = false;

  isLoadingResults: boolean = false;

  valueType = ValueType;
  valueTypes = Object.keys(this.valueType).filter((s) => !isNaN(Number(s)));

  propertiesColumnsToDisplay = ['name', 'description', 'valueType', 'actions'];
  expandedProperty: FormGroup | null;
  propertiesDataSource: MatTableDataSource<any>;

  template: Template;

  templateForm: FormGroup = this.fb.group({
    id: null,
    name: [null, Validators.required],
    description: null,
    updated: null,
    elements: this.fb.array([]),
    properties: this.fb.array([]),
  });

  templateSubscription: Subscription;
  dialogSubscription: Subscription;

  get elements(): FormArray {
    return this.templateForm.get('elements') as FormArray;
  }

  get properties(): FormArray {
    return this.templateForm.get('properties') as FormArray;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private templatesService: TemplatesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id === 'new') {
      this.isNew = true;
      return;
    }

    this.get(id);
  }

  ngOnDestroy(): void {
    if (this.templateSubscription) {
      this.templateSubscription.unsubscribe();
      this.templateSubscription = null;
    }

    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
      this.dialogSubscription = null;
    }
  }

  get(id: string): void {
    this.isLoadingResults = true;

    this.templateSubscription = this.templatesService.getById(id).subscribe(
      (res) => {
        this.template = res.data;

        if (!this.template.properties) {
          this.template.properties = [];
        }

        if (!this.template.elements) {
          this.template.elements = [];
        }

        this.templateForm.patchValue(this.template);

        this._initProperties();
        this._initElements();
      },
      (_) => {},
      () => (this.isLoadingResults = false)
    );
  }

  delete(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Delete template?',
        message: 'This will delete template permanently.',
        cancelName: 'Cancel',
        okName: 'Delete',
      },
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoadingResults = true;

        this.templateSubscription = this.templatesService
          .delete(this.template.id)
          .subscribe(
            () => {
              this.templateForm.reset();
              this.close();
            },
            (_) => (this.isLoadingResults = false),
            () => (this.isLoadingResults = false)
          );
      }
    });
  }

  save() {
    const template = this.templateForm.value as Template;

    this.isLoadingResults = true;

    if (template.id) {
      this.templateSubscription = this.templatesService
        .update(template)
        .subscribe(
          (res) => {
            this.template = res.data;
            this.templateForm.reset(this.template);
          },
          (_) => (this.isLoadingResults = false),
          () => (this.isLoadingResults = false)
        );
    } else {
      this.templateSubscription = this.templatesService.add(template).subscribe(
        (res) => {
          this.isNew = false;
          this.template = res.data;
          this.templateForm.reset(this.template);
          this.router.navigate([`../${res.data.id}`], {
            relativeTo: this.route,
          });
        },
        (_) => (this.isLoadingResults = false),
        () => (this.isLoadingResults = false)
      );
    }
  }

  close(): void {
    this.router.navigate(['/templates'], { relativeTo: this.route });
  }

  favorite() {
    // TODO: favorite
  }

  getAnimationState() {
    return this.isLoadingResults ? 'out' : 'in';
  }

  addProperty(property?: Property, isNew: boolean = false) {
    let group = this.fb.group({
      name: [property?.name, Validators.required],
      description: property?.description,
      valueType: [property?.valueType, Validators.required],
    });

    if (isNew) {
      this.properties.insert(0, group);

      this.setExpandedProperty(this.properties.controls[0] as FormGroup);

      this.properties.markAsDirty();
    } else {
      this.properties.push(group);
    }
  }

  removePropertyElement(element: FormGroup) {
    this.properties.removeAt(this.properties.controls.indexOf(element));
    this.properties.markAsDirty();
  }

  isPropertyExpanded(element: FormGroup) {
    return this.expandedProperty == element ? 'expanded' : 'collapsed';
  }

  updatePropertiesDataSource(): void {
    this.propertiesDataSource = new MatTableDataSource(
      this.properties.controls
    );

    this.propertiesDataSource.filterPredicate = (
      data: FormGroup,
      filter: string
    ) => {
      return (
        (data.controls.name.value as string).indexOf(filter) >= 0 ||
        (data.controls.description.value as string).indexOf(filter) >= 0 ||
        (data.controls.valueType.value as string).indexOf(filter) >= 0
      );
    };
  }

  filterProperties(value: string) {
    this.propertiesDataSource.filter = value.trim().toLowerCase();
  }

  setExpandedProperty(element: FormGroup): void {
    this.expandedProperty = this.expandedProperty === element ? null : element;
  }

  getSliceStr(str: string, slice: number) {
    return str && str?.length > slice ? str.slice(0, slice) + '...' : str;
  }

  private _initProperties(): void {
    if (this.template.properties && this.template.properties.length > 0) {
      this.template.properties.forEach((property) => {
        this.addProperty(property);
      });
    }

    this.updatePropertiesDataSource();
  }

  private _initElements(): void {
    if (this.template.elements && this.template.elements.length > 0) {
      this.template.elements.forEach((element) => {
        this.elements.push(
          this.fb.group({
            name: [element.name, Validators.required],
            description: element.description,
          })
        );
      });
    }
  }
}
