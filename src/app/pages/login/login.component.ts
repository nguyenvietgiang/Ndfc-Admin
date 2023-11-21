import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    
  ) {}

  ngOnInit(): void {

    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
  errors = { userName: '', password: '' };
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      const { userName, password } = this.validateForm.value;

      this.authService.login(userName, password).subscribe(
        (response) => {
          this.authService.saveTokens(response.refreshToken, response.token);
          this.router.navigate(['/player']); // Chuyển hướng đến '/player'
        },
        (error) => {
          if (error.status === 401) {
            // Unauthorized, display error message
            this.errors.userName = 'Sai tên đăng nhập';
            this.errors.password = 'Sai mật khẩu';
          } else {
            // Handle other errors
          }
        }
      );
    }
  }
}

