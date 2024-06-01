import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../../Services/user-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user = { name: '', email: '' };

  constructor(private router: Router, private userService: UserServiceService) {}

  onSubmit() {
    this.userService.addUser(this.user);
    this.router.navigate(['/main']);
  }
}
