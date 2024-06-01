import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-todo-dialog',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, FormsModule, MatInputModule, MatInput, MatFormField],
  template: `
  <div class="dialog-container">
  <h1 mat-dialog-title>{{ data.name ? 'Edit' : 'Add' }} To-Do</h1>
  <div mat-dialog-content>
  <mat-form-field>
  <textarea matInput placeholder="Description" [(ngModel)]="data.name" id="name" name="name" rows="4"></textarea>
</mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button class="btn btn-light" (click)="onCancel()">Cancel</button>
    <button mat-button  class="btn btn-success" (click)="onSave()">Save</button>
  </div>
  </div>
`,
  styles: [`
  .dialog-container {
    position: relative; /* Ensure the container is positioned */
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width:500px;
    padding: 20px;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
    mat-form-field {
      width: 500px;
    }
    textarea {
      resize: vertical;
    }
  `]
})
export class TodoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data.name);
  }
}
