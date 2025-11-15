import {Component} from '@angular/core';
import {dictionary, IDictItem} from '../dict';


@Component({
    selector: '#dictionary',
    templateUrl: './dictionary.component.html',
})
export class DictionaryComponent {
    dictionary: IDictItem[] = dictionary;
}
