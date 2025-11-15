import {Routes} from '@angular/router';
import {CounterComponent, DictionaryComponent} from './components';

export const routes: Routes = [
    {
        path: '',
        component: CounterComponent,
    },
    {
        path: 'dictionary',
        component: DictionaryComponent,
    }
];
