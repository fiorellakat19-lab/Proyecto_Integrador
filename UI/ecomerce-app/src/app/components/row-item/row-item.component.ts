import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../models/item';

@Component({
  selector: 'tr[row-item] ',
  imports: [],
  templateUrl: './row-item.html',
})
export class RowItemComponent {

  @Input() item!:Item;


  @Output() removeEventEmitter: EventEmitter<number> = new EventEmitter();
  onRemove(id:number){
    console.log("Remove item with id: ", id);
    this.removeEventEmitter.emit(id);
  }
}
