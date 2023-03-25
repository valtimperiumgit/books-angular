import { Component } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'books';

  model: NgbDateStruct;

  constructor(private calendar: NgbCalendar) {
  }

  onDateSelection(date: NgbDateStruct) {
    this.model = date;
  }
}


