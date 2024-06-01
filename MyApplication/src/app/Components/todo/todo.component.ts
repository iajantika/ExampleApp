import { Component } from '@angular/core';
import { TodoService } from '../../Services/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, MatDialogModule, 
    MatButtonModule, 
    MatIconModule, 
    MatInputModule, 
    MatFormFieldModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
items:{name:string}[]=[];
currentItemIndex:number = -1;
currentItemName:string = '';
isEditing:boolean = false;

constructor(private service:TodoService){}

ngOnInit():void{
  this.service.items$.subscribe((items)=> this.items = items);
}

addItem():void{
  if(this.isEditing){
    this.service.udpateItems(this.currentItemIndex, this.currentItemName);
  }
  else{
    this.service.addItems({name:this.currentItemName})
  }
  this.resetForm();
}

editItem(index:number):void{
this.currentItemIndex = index;
this.currentItemName = this.items[index].name;
this.isEditing = true;
}

deleteItem(index:number):void{
  this.service.deleteItems(index)
}

resetForm(){
this.currentItemIndex = -1;
this.currentItemName = '';
this.isEditing = false;
}
}
