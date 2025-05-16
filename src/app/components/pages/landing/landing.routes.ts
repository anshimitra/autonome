import { Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { HomeComponent } from './components/home/home.component';
import { FeaturesComponent } from './components/features/features.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { AboutsComponent } from './components/abouts/abouts.component';
import { ContactsComponent } from './components/contacts/contacts.component';

export const landing_routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'features', component: FeaturesComponent },
      { path: 'pricing', component: PricingComponent },
      { path: 'about-us', component: AboutsComponent },
      { path: 'contact-us', component: ContactsComponent },
      {
        path: 'login',
        loadComponent: () =>
          import('../../auth/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },

    ],
  },
];
