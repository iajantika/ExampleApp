import { Component } from '@angular/core';
import { UserServiceService } from '../../Services/user-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  users:{name:string, email:string}[] = [];
  constructor(private userService: UserServiceService) {}

  ngOnInit() {
    this.users = this.userService.getUsers();
  }
  clearAllUsers() {
    this.userService.clearUsers();
    this.users = [];
  }
}
