import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MvComponent } from './pages/mv/mv/mv.component';

export const routes: Routes = [
  {
      path: 'home', component : HomeComponent
  },
  {
    path: 'mv', component : MvComponent
  }
];
