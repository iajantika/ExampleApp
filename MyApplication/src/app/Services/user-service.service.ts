import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }
  private loginStatusKey = 'isLoggedIn';


  isLoggedIn(): boolean {
    return localStorage.getItem(this.loginStatusKey) === 'true';
  }

  addUser(user: any) {
    let users = this.getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem(this.loginStatusKey, 'true');
  }

  getUsers(): any[] {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }

  logout() {
    localStorage.removeItem(this.loginStatusKey);
  }
}
