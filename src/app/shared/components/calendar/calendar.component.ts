import { Component, OnInit, Input } from '@angular/core';

import { PopoverController } from '@ionic/angular';

import { formatISO, parseISO } from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {


  valueDateTime;

  constructor(
    private popoverController: PopoverController
  ) { }

  @Input()
  set setObjetCurrentDate(data) {
    if (data) {
      this.valueDateTime = formatISO(data);
    }
  }


  ngOnInit() { }

  formatDate(value) {
    this.valueDateTime = value;
  }

  choose() {
    this.popoverController.dismiss({
      dateFormatted: parseISO(this.valueDateTime).getTime()
    });
  }

}
