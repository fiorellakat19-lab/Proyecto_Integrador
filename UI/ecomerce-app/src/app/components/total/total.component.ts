import { Component, Input } from '@angular/core';

@Component({
  selector: 'total',
  imports: [],
  templateUrl: './total.html',

})
export class TotalComponent {

@Input() total:number=0;

}
