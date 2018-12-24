import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HomeService } from '../../home.service';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'merculet-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private home: HomeService,
    private modal: NzModalRef,
    private message: NzMessageService,
    private storage:StorageService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  //reset validation
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    this.modal.triggerCancel();
  }

  // submit
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      this.login()
    }
  }

  //login function
  login() {
    this.home
      .login(this.validateForm.value)
      .subscribe(({ code, message, data }) => {
        if (code == 0) {
          this.validateForm.reset();
          this.modal.triggerOk();
          this.message.success("success");
          this.storage.set('token',data['token'])
          this.storage.set('email',data['user']['email'])
          this.storage.set('user',data['user'])
        } else {
          this.message.error(message);
        }
      });
  }

}
