import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password-less',
  templateUrl: './password-less.component.html',
  styleUrls: ['./password-less.component.scss']
})
export class PasswordLessComponent implements OnInit {
  passwordLessForm: FormGroup;
  errorMessage: string;
  emailSent: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    const url = this.router.url;
    this.authService.confirmSignIn(url);
  }
  initForm() {
    this.passwordLessForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  onSubmit() {
    const email = this.passwordLessForm.get('email').value;

    this.authService.passwordLess(email).then(
      () => {
        this.emailSent = true;
      },
      error => {
        this.errorMessage = error;
      }
    );
  }
}
