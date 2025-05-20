import { UserStore } from '../../../../@core/stores/user.store';
import { UsersService } from '../../../../@core/services/users.service';
/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS, NbAuthService, NbAuthResult } from '@nebular/auth';
import { getDeepFromObject } from '../../../helpers';
import { UserData } from '../../../../@core/interfaces/common/users';

@Component({
  selector: 'ngx-change-password-form',
  styleUrls: ['./change-password-form.component.scss'],
  templateUrl: './change-password-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NgxChangePasswordFormComponent implements OnInit {
  minLength: number = this.getConfigValue('forms.validation.password.minLength');
  maxLength: number = this.getConfigValue('forms.validation.password.maxLength');
  redirectDelay: number = this.getConfigValue('forms.resetPassword.redirectDelay');
  showMessages: any = this.getConfigValue('forms.resetPassword.showMessages');
  strategy: string = this.getConfigValue('forms.resetPassword.strategy');
  isPasswordRequired: boolean = this.getConfigValue('forms.validation.password.required');

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];

  passwords: any = {};

  changePasswordForm: FormGroup;

  constructor(protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected fb: FormBuilder,
    protected router: Router,
    private api: UserData,
    private userService: UsersService,
    private userStore: UserStore) { }

  ngOnInit(): void {
    const passwordValidators = [
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength),
    ];
    this.isPasswordRequired && passwordValidators.push(Validators.required);

    this.changePasswordForm = this.fb.group({
      password: this.fb.control('', [...passwordValidators]),
      passwordConfirmation: this.fb.control('', [...passwordValidators]),
    });
  }

  get password() { return this.changePasswordForm.get('password'); }
  get passwordConfirmation() { return this.changePasswordForm.get('passwordConfirmation'); }

  changePassword(): void {
    this.errors = this.messages = [];
    this.submitted = true;
    this.passwords = this.changePasswordForm.value;

    // console.log(this.passwords);

    this.api.changeCurrentPassword(this.passwords).subscribe((result) => {
      this.submitted = false;
      if (result.success === true) {
        // any additional tasks to run before navigation will go here
        let user = this.userStore.getUser()
        user.password_expired = false;
        this.userService.update(user)
        setTimeout(() => {
          return this.router.navigateByUrl('');
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });


    // this.service.resetPassword(this.strategy, this.user).subscribe((result: NbAuthResult) => {
    //   this.submitted = false;
    //   if (result.isSuccess()) {
    //     this.messages = result.getMessages();
    //     let user = this.userStore.getUser()
    //     user.password_expired = false;
    //     this.userService.update(user)
    //   } else {
    //     this.errors = result.getErrors();
    //   }
    // });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
