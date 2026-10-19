import { Component, Input } from '@angular/core';

@Component({
  selector: 'invoice-view',
  imports: [],
  templateUrl: './invoice-view.html'
})
export class InvoiceViewComponent {

  @Input() name !:string;
  @Input() id !:Number;
  @Input() numero !:string;
}
