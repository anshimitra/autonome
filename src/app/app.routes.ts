import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { content } from './shared/routes/routes';
import { NgModule } from '@angular/core';
// debugger
export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: LayoutComponent, children: content
  },
  // Wildcard route for handling any unmatched url, directs to not found page
  {path:'**', component: NotFoundComponent}
];


