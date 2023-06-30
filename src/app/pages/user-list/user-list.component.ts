import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/user.service';
import { Account } from 'src/app/models/account.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  dataSet: Account[] = [];

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.loadAccountList();
  }

  loadAccountList(): void {
    this.accountService.getAccountList().subscribe(
      (accounts: Account[]) => {
        this.dataSet = accounts;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  downloadExcelFile() {
    this.accountService.downloadExcelFile().subscribe((blob: Blob) => {
      this.saveFile(blob, 'exported_file.xlsx');
    });
  }

  private saveFile(blob: Blob, fileName: string) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }
}
