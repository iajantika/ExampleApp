import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
private items:BehaviorSubject<{name:string}[]> = new BehaviorSubject<{name:string}[]>([]);
public items$:Observable<{name:string}[]> = this.items.asObservable();
  constructor() { 
    this.getItemsLocal();
  }

  getItems():{name:string}[] {
    return this.items.getValue();
  }

  addItems(item:{name:string}):void{
    const currentItems = this.getItems();
    currentItems.push(item);
    this.items.next(currentItems);
    this.saveLocal(currentItems);
  }

  udpateItems(index:number, item:string){
   const currentItems = this.getItems();
   currentItems[index].name = item;
   this.items.next(currentItems);
   this.saveLocal(currentItems);

  }

  deleteItems(index:number):void{
  const currentItems = this.getItems();
  currentItems.splice(index,1);
  this.items.next(currentItems);
  this.saveLocal(currentItems);

  }
  private saveLocal(items: {name:string}[]){
    localStorage.setItem('items', JSON.stringify(items));
  }
  
  private getItemsLocal(): void{
    const allItems = localStorage.getItem('items');
    if(allItems){
      const items = JSON.parse(allItems);
      this.items.next(items);
    }
  
  
  }
}
