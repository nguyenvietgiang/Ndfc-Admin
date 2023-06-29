import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

interface NewsItem {
  id: string;
  title: string;
  image: string;
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
  listNewsData: NewsItem[] = [];

  constructor(private newsService: NewsService) { }

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
  

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
