import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  isVisible = false;
  isOkLoading = false;
  feedbackForm!: FormGroup;
  listOfData: Contact[] = [];

  constructor(private fb: FormBuilder, private contactService: ContactService) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllContacts();
  }

  initForm(): void {
    this.feedbackForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      body: ['', Validators.required]
    });
  }

  getAllContacts(): void {
    this.contactService.getAllContacts().subscribe(
      (contacts: Contact[]) => {
        this.listOfData = contacts;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    if (this.feedbackForm.valid) {
      this.isOkLoading = true;
  
      const email = this.feedbackForm.value.email;
      const bodyString = this.feedbackForm.value.body;
  
      const feedbackData = {
        mail: email,
        bodyString: bodyString
      };
  
      this.contactService.sendFeedback(feedbackData).subscribe(
        () => {
          this.isVisible = false;
          this.isOkLoading = false;
          this.feedbackForm.reset();
        },
        (error: any) => {
          console.error(error);
          this.isOkLoading = false;
        }
      );
    } else {
      this.validateForm();
    }
  }
  

  handleCancel(): void {
    this.isVisible = false;
    this.feedbackForm.reset();
  }

  validateForm(): void {
    for (const i in this.feedbackForm.controls) {
      if (this.feedbackForm.controls.hasOwnProperty(i)) {
        this.feedbackForm.controls[i].markAsDirty();
        this.feedbackForm.controls[i].updateValueAndValidity();
      }
    }
  }
}








