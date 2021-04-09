import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filter: any): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter((res: any) => {
      if (filter === 'active') {
        return res.completed === false;
      }
      if (filter === 'completed') {
        return res.completed === true;
      }
      if (filter === 'all') {
        return res;
      }
    });
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
  }

}
