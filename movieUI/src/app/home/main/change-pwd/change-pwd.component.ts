import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { HomeService } from "../../home.service";
import { NzModalRef, NzMessageService } from "ng-zorro-antd";
import { StorageService } from "src/app/service/storage.service";

@Component({
  selector: "merculet-change-pwd",
  templateUrl: "./change-pwd.component.html",
  styleUrls: ["./change-pwd.component.scss"]
})
export class ChangePwdComponent implements OnInit {
  validateForm: FormGroup;
  list: any = [];

  constructor(
    private fb: FormBuilder,
    private home: HomeService,
    private modal: NzModalRef,
    private message: NzMessageService,
    private storage: StorageService
  ) {}


  ngOnInit(): void {
    let params = {
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]]
    };

    this.validateForm = this.fb.group(params);
  }

  //wait for the validation to confirm
  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  //get validation confirmation
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  };

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
      this.updatePassowrd()
    }
  }

  //update password
  updatePassowrd() {
    this.home
      .updatePassowrd({password:this.validateForm.value.password})
      .subscribe(({ code, message, data }) => {
        if (code == 0) {
          this.validateForm.reset();
          this.modal.triggerOk();
          this.message.success("success");
        } else {
          this.message.error(message);
        }
      });
  }
}
