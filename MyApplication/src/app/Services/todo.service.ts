import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoItem } from '../Interfaces/todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private items: BehaviorSubject<TodoItem[]> = new BehaviorSubject<TodoItem[]>([]);
  private inProgress: BehaviorSubject<TodoItem[]> = new BehaviorSubject<TodoItem[]>([]);
  private completed: BehaviorSubject<TodoItem[]> = new BehaviorSubject<TodoItem[]>([]);

  public items$: Observable<TodoItem[]> = this.items.asObservable();
  public inProgress$: Observable<TodoItem[]> = this.inProgress.asObservable();
  public completed$: Observable<TodoItem[]> = this.completed.asObservable();

  constructor() { 
    this.getItemsLocal();
    this.getInProgressLocal();
    this.getCompletedLocal();
  }

  getItems(): TodoItem[] {
    return this.items.getValue();
  }

  getInProgressItems(): TodoItem[] {
    return this.inProgress.getValue();
  }

  getCompletedItems(): TodoItem[] {
    return this.completed.getValue();
  }

  addItems(item: {name: string}): void {
    const currentItems = this.getItems();
    const newItem: TodoItem = { name: item.name, created: new Date() };
    currentItems.push(newItem);
    this.items.next(currentItems);
    this.saveLocal('items', currentItems);
  }

  updateItems(index: number, item: string): void {
    const currentItems = this.getItems();
    currentItems[index].name = item;
    this.items.next(currentItems);
    this.saveLocal('items', currentItems);
  }

  deleteItems(index: number): void {
    const currentItems = this.getItems();
    currentItems.splice(index, 1);
    this.items.next(currentItems);
    this.saveLocal('items', currentItems);
  }

  moveToInProgress(index: number): void {
    const currentItems = this.getItems();
    const item = currentItems.splice(index, 1)[0];
    item.inProgress = new Date();
    const currentInProgress = this.getInProgressItems();
    currentInProgress.push(item);
    this.items.next(currentItems);
    this.inProgress.next(currentInProgress);
    this.saveLocal('items', currentItems);
    this.saveLocal('inProgress', currentInProgress);
  }

  moveToCompleted(index: number): void {
    const currentInProgress = this.getInProgressItems();
    const item = currentInProgress.splice(index, 1)[0];
    item.completed = new Date();
    const currentCompleted = this.getCompletedItems();
    currentCompleted.push(item);
    this.inProgress.next(currentInProgress);
    this.completed.next(currentCompleted);
    this.saveLocal('inProgress', currentInProgress);
    this.saveLocal('completed', currentCompleted);
  }

  deleteInProgressItem(index: number): void {
    const currentInProgress = this.getInProgressItems();
    currentInProgress.splice(index, 1);
    this.inProgress.next(currentInProgress);
    this.saveLocal('inProgress', currentInProgress);
  }

  deleteCompletedItem(index: number): void {
    const currentCompleted = this.getCompletedItems();
    currentCompleted.splice(index, 1);
    this.completed.next(currentCompleted);
    this.saveLocal('completed', currentCompleted);
  }

  private saveLocal(key: string, items: TodoItem[]): void {
    localStorage.setItem(key, JSON.stringify(items));
  }

  private getItemsLocal(): void {
    const allItems = localStorage.getItem('items');
    if (allItems) {
      const items = JSON.parse(allItems);
      this.items.next(items);
    }
  }

  private getInProgressLocal(): void {
    const allInProgress = localStorage.getItem('inProgress');
    if (allInProgress) {
      const items = JSON.parse(allInProgress);
      this.inProgress.next(items);
    }
  }

  private getCompletedLocal(): void {
    const allCompleted = localStorage.getItem('completed');
    if (allCompleted) {
      const items = JSON.parse(allCompleted);
      this.completed.next(items);
    }
  }
}