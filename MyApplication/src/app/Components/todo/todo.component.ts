import { Component } from '@angular/core';
import { TodoService } from '../../Services/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';
import { TodoItem } from '../../Interfaces/todo-item';

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
  items: TodoItem[] = [];
  currentItemIndex: number = -1;
  currentItemName: string = '';
  isEditing: boolean = false;
  inProgressItems: TodoItem[] = [];
  completedItems: TodoItem[] = [];

  colors: string[] = ['#FFCDD2', '#C8E6C9', '#BBDEFB', '#FFF9C4', '#D1C4E9'];

  constructor(private service: TodoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.service.items$.subscribe((items) => this.items = items);
    this.service.inProgress$.subscribe((items) => this.inProgressItems = items);
    this.service.completed$.subscribe((items) => this.completedItems = items);
  }

  openDialog(item: any = null, index: number | null = null): void {
    this.isEditing = !!item;
    this.currentItemIndex = index !== null ? index : -1;
    this.currentItemName = item ? item.name : '';

    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '500px',
      data: { name: this.currentItemName }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && this.isValidInput(result)) {
        this.currentItemName = result;
        this.addItem();
      }
      else if(result && !this.isValidInput(result)) {
        alert('Special characters are not allowed.');
      }
    });
  }

  addItem(): void {
    if (this.isEditing) {
      this.service.updateItems(this.currentItemIndex, this.currentItemName);
    } else {
      this.service.addItems({ name: this.currentItemName});
    }
    this.resetForm();
  }

  editItem(index: number): void {
    this.openDialog(this.items[index], index);
  }

  deleteItem(index: number): void {
    this.service.deleteItems(index);
  }

  resetForm(): void {
    this.currentItemIndex = -1;
    this.currentItemName = '';
    this.isEditing = false;
  }

  getCardColor(index: number): string {
    return this.colors[index % this.colors.length];
  }

  moveToInProgress(index: number): void {
    this.service.moveToInProgress(index);
  }

  deleteInProgressItem(index: number): void {
    this.service.deleteInProgressItem(index);
  }

  moveToCompleted(index: number): void {
    this.service.moveToCompleted(index);
  }

  deleteCompletedItem(index: number): void {
    this.service.deleteCompletedItem(index);
  }

  isValidInput(input: string): boolean {
    const regex = /^[a-zA-Z0-9 ]*$/;
    return regex.test(input);
  }

  onCheckboxChange(index: number): void {
    this.moveToCompleted(index);
  }
}
