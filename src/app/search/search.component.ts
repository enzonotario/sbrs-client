import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Http} from "@angular/http";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {
  private API_URL: string = 'http://localhost:8000/api/';

  private question: string;

  private results: any;

  _testQuestions: any;

  private loading: boolean = false;

  constructor(
    private _titleService: Title,
    private http: Http,
  ) {
  }

  ngAfterViewInit(): void {
    this._titleService.setTitle('Buscador de Salta');
  }

  ngOnInit() {
    this.getTestQuestions();
  }

  search(question?: string): void {
    if (question) {
      this.question = question;
    }

    this.loading = true;

    this.http
      .post(this.API_URL + 'search', { question: this.question })
      .map(response => response.json())
      .subscribe(
        (response: any) => {
          this.results = response;

          this.loading = false;
        },
        (errors: any) => {
          this.results = {
            data: {}
          };

          this.loading = false;
        }
      );
  }

  getTestQuestions(): void {
    this.http
      .get(this.API_URL + 'search/testQuestions')
      .map(response => response.json())
      .subscribe(
        (response: any) => {
          this._testQuestions = response;
          console.debug('_testQuestions', this._testQuestions);
        },
      );
  }
}
