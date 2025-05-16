import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

export const admin_routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (c) => c.HomeComponent
          ),
      },
    ],
  },
];
