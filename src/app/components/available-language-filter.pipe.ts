import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'availableLanguageFilter',
    pure: false
})
export class AvailableLanguageFilter implements PipeTransform {
    transform(items: any[], chosenLanguages: any): any {
        if (!items || !chosenLanguages) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        // console.log('entering items', items.filter(item => !chosenLanguages[item.key]));
        return items.filter(item => !chosenLanguages[item.key]);
    }
}