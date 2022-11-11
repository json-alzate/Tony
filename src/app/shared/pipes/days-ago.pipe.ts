import { Pipe, PipeTransform } from '@angular/core';

import { differenceInDays } from 'date-fns';

@Pipe({
  name: 'daysAgo'
})
export class DaysAgoPipe implements PipeTransform {

  transform(date: number): unknown {
    return differenceInDays(new Date(), date);
  }

}
