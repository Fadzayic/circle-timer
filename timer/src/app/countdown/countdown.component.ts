import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, merge, Observable, of } from "rxjs";

const circleR = 80;
const circleDasharray = 2 * Math.PI * circleR;

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  timerStarted: boolean = false;

  time: BehaviorSubject<string> = new BehaviorSubject("00:00");
  percent: BehaviorSubject<number> = new BehaviorSubject(100);

  timer: number;

  interval;

  startDuration = 1;

  circleR = circleR;
  circleDasharray = circleDasharray;

  constructor() { }

  ngOnInit(): void {
  }

  startTimer(duration: number) {
    clearInterval(this.interval);
    this.timerStarted = true;
    this.timer = duration * 35;
    this.updateTimeValue();
    this.interval = setInterval(() => {
      this.updateTimeValue();
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
    this.time.next("00:00");
  }

  percentageOffset(percent) {
    const percentFloat = percent / 100;
    return circleDasharray * (1 - percentFloat);
  }

  swapDuration() {
    this.startDuration = this.startDuration === 1 ? 0.5 : 1;
  }

  updateTimeValue() {
    let minutes: any = this.timer / 60;
    let seconds: any = this.timer % 60;

    minutes = String("0" + Math.floor(minutes)).slice(-2);
    seconds = String("0" + Math.floor(seconds)).slice(-2);

    const text = minutes + ":" + seconds;
    this.time.next(text);

    const totalTime = this.startDuration * 35;
    const percentage = ((totalTime - this.timer) / totalTime) * 100;
    this.percent.next(percentage);

    --this.timer;

    if (this.timer < 0) {
      this.stopTimer();
    }
  }

}
