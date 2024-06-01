import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { AboutComponent } from './Components/about/about.component';
import { TodoComponent } from './Components/todo/todo.component';
import { MainComponent } from './Components/main/main.component';
import { authGuard } from './Guards/auth.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'main', component: MainComponent, canActivate: [authGuard], children: [
        { path: 'home', component: HomeComponent },
        { path: 'about', component: AboutComponent },
        { path: 'todo', component: TodoComponent }
    ]}
];
