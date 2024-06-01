import { Component } from '@angular/core';
import { RouterOutlet,RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, MatTabsModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isActive:boolean = false;
  constructor(private router:Router){}
 
  directHome(){
    this.router.navigate(['/main/home']);
    this.isActive=true;
  }
  directAbout(){
    this.router.navigate(['/main/about']);
    this.isActive=true;

  }
  directTodo(){
    this.router.navigate(['/main/todo']);
    this.isActive=true;

  }
}
