import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Auth } from 'src/app/models/auth.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  userInfo: Auth = {} as Auth;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    const token = this.authService.getToken(); // Lấy token từ cookie hoặc từ nơi bạn lưu trữ token
    this.authService.getUserInfo(token).subscribe(
      (response: Auth) => {
        this.userInfo = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
