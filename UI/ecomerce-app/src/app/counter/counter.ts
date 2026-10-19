import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit,Output,PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter implements OnInit {
  private platformId = inject(PLATFORM_ID);
 counter: number = 0;
 @Input() title!: string ;
 @Output() counterEmit: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
 if (isPlatformBrowser(this.platformId)) {
      const savedCounter = sessionStorage.getItem('counter');
      if (savedCounter) {
        this.counter = parseInt(savedCounter, 10);
      }
    }
  }
  setCounter():  void{
    this.counter = this.counter+1;
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem("counter",this.counter.toString());
      this.counterEmit.emit(this.counter)
    }
  }


}
