import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface NewsItem {
  id: string;
  title: string;
  image: any;
  description: string;
  detail: string;
  createOn: string;
  status: number;
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  isVisible = false;
  isVisibleAdding = false;
  listNewsData: NewsItem[] = [];
  addNewsForm: FormGroup;
  Editor = ClassicEditor;
  selectedImage: File | null = null;

  constructor(
    private newsService: NewsService,
    private formBuilder: FormBuilder
  ) {
    this.addNewsForm = this.formBuilder.group({
      title: ['', Validators.required],
      image: [''],
      description: [''],
      detail: ['']
    });
  }

  ngOnInit(): void {
    this.fetchNews();
  }

  fetchNews(): void {
    this.newsService.getNews().subscribe(
      (news: NewsItem[]) => {
        this.listNewsData = news;
        console.log(this.listNewsData);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  showAddingModal(): void {
    this.isVisibleAdding = true;
  }

  handleCancelAdding(): void {
    this.isVisibleAdding = false;
  }

  handleOkAdding(): void {
    if (this.addNewsForm.valid) {
      const formData = new FormData();
      formData.append('title', this.addNewsForm.value.title);
      formData.append('description', this.addNewsForm.value.description);
      formData.append('detail', this.addNewsForm.value.detail);
      if (this.selectedImage) {
        formData.append('image', this.selectedImage, this.selectedImage.name);
      }

      this.newsService.createNews(formData).subscribe(
        (response: any) => {
          console.log('News created successfully');
          this.fetchNews();
          this.isVisibleAdding = false;
        },
        (error: any) => {
          console.error(error);
        }
      );
    } else {
      this.validateForm();
    }
  }

  handleImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }

  private validateForm(): void {
    // Các logic kiểm tra hợp lệ của form
  }

  isString(value: any): boolean {
    return typeof value === 'string';
  }
  
  deleteNews(id: string): void {
    this.newsService.deleteNew(id).subscribe(
      (response: any) => {
        console.log('News deleted successfully');
        this.fetchNews();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  
}



