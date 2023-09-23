import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'Lista de estudiantes',
    pathMatch: 'full',
  },
  {
    path: 'Lista de estudiantes',
    loadComponent: () => import('./pages/student-list/student-list.page').then( m => m.StudentListPage)
  },
];
