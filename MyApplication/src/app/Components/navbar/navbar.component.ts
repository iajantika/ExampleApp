import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private router:Router){}
  directHome(){
    this.router.navigate(['/main/home']);
  }
  directAbout(){
    this.router.navigate(['/main/about']);
  }
  directTodo(){
    this.router.navigate(['/main/todo']);
  }
}
