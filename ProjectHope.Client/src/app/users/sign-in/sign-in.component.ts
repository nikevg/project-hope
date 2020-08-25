import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { UsersService } from 'src/app/shared/services/users.service';
import { SignIn } from 'src/app/shared/models/users/sign-in';
import { enterLeaveAnimation } from 'src/app/shared/theming/animation';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  animations: [enterLeaveAnimation],
})
export class SignInComponent implements OnInit, OnDestroy {
  isLoadingResults: boolean = false;
  hidePassword: boolean = true;

  form: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required],
  });

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

  save(): void {
    var data = this.form.value as SignIn;
    this.isLoadingResults = true;

    this.subscription = this.userService.signIn(data).subscribe(
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
}
