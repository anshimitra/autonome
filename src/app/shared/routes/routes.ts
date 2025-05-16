export const content = [
  {
    path: '',
    loadChildren: () =>
      import('../../components/pages/landing/landing.routes').then(
        (r) => r.landing_routes
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('../../components/pages/admin/admin.routes').then(
        (r) => r.admin_routes
      ),
  },
  {
    path: 'project',
    loadChildren: () =>
      import('../../components/pages/project/project.routes').then(
        (r) => r.project_routes
      ),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('../../components/auth/signup/signup.component').then(
        (c) => c.SignupComponent
      ),
  },
  {
    path: 'forget',
    loadComponent: () =>
      import('../../components/auth/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
];
