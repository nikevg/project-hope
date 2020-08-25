import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { SignUp } from 'src/app/shared/models/users/sign-up';
import { UsersService } from 'src/app/shared/services/users.service';
import { enterLeaveAnimation } from 'src/app/shared/theming/animation';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  animations: [enterLeaveAnimation],
})
export class SignUpComponent implements OnInit, OnDestroy {
  isLoadingResults: boolean = false;
  hidePassword: boolean = true;

  form: FormGroup = this.fb.group(
    {
      name: [null, Validators.required],
      email: [
        null,
        [Validators.required, Validators.email],
        this.checkEmail.bind(this),
      ],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, Validators.required],
    },
    { validator: this.comparePassword }
  );

  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UsersService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  comparePassword(fg: FormGroup) {
    const passwordControl = fg.controls['password'];
    const confirmPasswordControl = fg.controls['confirmPassword'];

    if (
      confirmPasswordControl.errors &&
      !confirmPasswordControl.errors.mustMatch
    ) {
      return;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ mustMatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }
  }

  save(): void {
    var data = this.form.value as SignUp;
    this.isLoadingResults = true;

    this.subscription = this.userService.signUp(data).subscribe(
      (res) => {
        if (res) {
          this.close();
        }
      },
      (_) => (this.isLoadingResults = false),
      () => (this.isLoadingResults = false)
    );
  }

  close(): void {
    this.router.navigate(['/'], { relativeTo: this.route });
  }

  checkEmail(control: AbstractControl): Observable<ValidationErrors> {
    return this.userService
      .check(control.value)
      .pipe(map((res) => (res ? { emailRegistered: true } : null)));
  }
}
