import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Auth } from 'src/app/models/auth.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  userInfo: Auth = {} as Auth;
  constructor(private authService: AuthService, private modalService: NzModalService,  private cookieService: CookieService , private router: Router) {}

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

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Logout',
      nzContent: 'Are you sure you want to logout',
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        // Xóa token và refresh token từ cookie
        this.cookieService.delete('token');
        this.cookieService.delete('refreshToken');
        
        // Chuyển hướng đến trang đăng nhập
        this.router.navigate(['/login']);
      }
    });
  }
  
}
