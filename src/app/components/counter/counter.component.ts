import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {dictionary} from '../dict';

@Component({
    selector: '#counter',
    templateUrl: './counter.component.html',
})
export class CounterComponent implements OnInit, OnDestroy {
    minimum_speed: number = 5000;

    interval_speed: number = 2000;
    running: boolean = false;
    interval_id: any;
    symbols: Array<string> = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+"
    ]

    dictionary: Array<string> = [];
    is_dict: boolean = false;

    currentCharacter: BehaviorSubject<string> = new BehaviorSubject<string>(this.getRandomCharacter());
    html_input_value: number = 40;
    speed: BehaviorSubject<number> = new BehaviorSubject<number>(2000);

    session_timer: any;
    session_length: number = 900;
    session_timer_end: number = 900;

    ngOnDestroy() {}
    ngOnInit() {
        dictionary.map(word => {
            this.dictionary.push(word.label);
        });
    }

    onInputChange($event: any) {
        const current_value = parseInt($event.target.value);
        const speed_in_milliseconds = Math.floor((current_value/100) * this.minimum_speed);
        this.interval_speed = speed_in_milliseconds;
        this.speed.next(speed_in_milliseconds);
        if ($event.target.value.length) {
            this.startCounter();
        }
    }

    startCounter() {
        this.stopCounter();
        const self = this;
        let i = 0;
        this.running = true;
        this.interval_id = setInterval(function () {
            self.currentCharacter.next(self.getRandomCharacter());
            i++;
        }, this.interval_speed);
        this.startGlobalTimer();
    }

    stopCounter() {
        this.running = false;
        clearInterval(this.interval_id);
        clearInterval(this.session_timer);
    }

    toggleDictionary() {
        this.running = false;
        clearInterval(this.interval_id);
        clearInterval(this.session_timer);
        this.is_dict = !this.is_dict;

        this.currentCharacter.next(this.getRandomCharacter());
    }

    getRandomCharacter() {
        if ( this.is_dict ) {
            const randomIndex = Math.floor(Math.random() * this.dictionary.length);
            return this.dictionary[randomIndex];
        } else {
            const randomIndex = Math.floor(Math.random() * this.symbols.length);
            return this.symbols[randomIndex];
        }
    }

    startGlobalTimer() {
        clearInterval(this.session_timer);
        const self = this;
        this.session_timer = setInterval(function () {
            self.session_timer_end -= 1;
            if (self.session_timer_end <= 0) {
                self.stopCounter();
                self.session_timer_end = self.session_length;
            }
        }, 1000);
    }

    show_end_time() {
        const endtime = this.session_timer_end;
        const minutes = Math.floor(endtime/60);
        const _seconds = endtime - minutes * 60;
        const seconds = _seconds < 10? `0${_seconds}`: _seconds;
        return `${minutes} : ${seconds}`;
    }
}
