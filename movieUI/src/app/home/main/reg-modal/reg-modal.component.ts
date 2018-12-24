import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from "@angular/forms";
import { HomeService } from "../../home.service";
import { NzModalRef, NzMessageService } from "ng-zorro-antd";

@Component({
  selector: "merculet-reg-modal",
  templateUrl: "./reg-modal.component.html",
  styleUrls: ["./reg-modal.component.scss"]
})
export class RegModalComponent implements OnInit {
  validateForm: FormGroup;
  list: any = [];

  constructor(
    private fb: FormBuilder,
    private home: HomeService,
    private modal: NzModalRef,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      name: [null, ],
      address: [null, ],
      phone: [null, ],
    });
  }

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
      this.registerUser();
    }
  }

  //register
  registerUser() {
    this.home
      .registerUser(this.validateForm.value)
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
