import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {
  @Input() directory: any;

  @Output() fileClicked: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.debug('d', this.directory);
  }

}
