import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [RouterModule, CommonModule],
    templateUrl: './app.html',
})
export class App {}
