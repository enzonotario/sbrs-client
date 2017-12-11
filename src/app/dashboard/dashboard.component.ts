import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Http} from "@angular/http";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  private API_URL: string = 'http://localhost:8000/api/';

  _fileTree: any;
  _json: any = {
    data: {},
  };
  _text: string;
  _levelsOpen: number = 1;

  constructor(
    private _titleService: Title,
    private http: Http,
  ) {
  }

  ngAfterViewInit(): void {
    this._titleService.setTitle('SBRS');
  }

  ngOnInit() {
    this.init();
  }

  init(): void {
    this.http
      .get(this.API_URL + 'corpus')
      .map(response => response.json())
      .subscribe(
        (response: any) => {
          this._fileTree = response;
          console.debug('_fileTree', this._fileTree.data);
        },
        (errors: any) => {
          console.error(errors);
        }
      );
  }

  extractFromFile(path: string) {
    this._levelsOpen = 1;
    this.extract({
      filepath: path,
    });
  }

  extractFromText(text: string) {
    this._levelsOpen = 5;
    this.extract({
      text: text,
    });
  }

  extract(options: any) {
    this._json = null;

    this.http
      .post(this.API_URL + 'extractor', options)
      .map(response => response.json())
      .subscribe(
        (response: any) => {
          this._json = response;
          console.debug('_fileTree', this._fileTree.data);
        },
        (errors: any) => {
          console.error(errors);
        }
      );
  }
}
