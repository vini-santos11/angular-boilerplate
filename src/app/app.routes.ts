import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MvComponent } from './pages/mv/mv/mv.component';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'mv', component: MvComponent },
      { path: 'carv', component: HomeComponent }
    ]
  }
];
