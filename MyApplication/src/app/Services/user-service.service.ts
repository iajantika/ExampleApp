import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private loginStatusKey = 'isLoggedIn';

  constructor() { }

  isLoggedIn(): boolean {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.loginStatusKey) === 'true';
    }
    return false;
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

  clearUsers() {
    localStorage.removeItem('users');
  }

  logout() {
    localStorage.removeItem(this.loginStatusKey);
  }
}

