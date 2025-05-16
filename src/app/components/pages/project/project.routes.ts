import { Routes } from '@angular/router';
import { ProjectComponent } from './project.component';
import { TeamComponent } from './components/team/team.component';
import { NotificationComponent } from './components/notification/notification.component';
import { TimeComponent } from './components/time/time.component';
import { ProjectDashboardComponent } from './components/project-dashboard/project-dashboard.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectDetailsComponent } from './components/project-list/project-details/project-details.component';
import { ProjectAddComponent } from './components/project-list/project-add/project-add.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EditProjectComponent } from './components/project-list/edit-project/edit-project.component';
import { CreateTaskComponent } from './components/project-list/project-details/create-task/create-task.component';
import { EditTaskComponent } from './components/project-list/project-details/edit-task/edit-task.component';
import { InviteTeamComponent } from './components/team/invite-team/invite-team.component';
import { AcceptInviteComponent } from './components/team/accept-invite/accept-invite.component';
import { authGuard } from '../../../core/guards/auth.guard';
import { TeamTasksComponent } from './components/team/team-tasks/team-tasks.component';

export const project_routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ProjectDashboardComponent },
      { path: 'profile', component: UserProfileComponent },
      {
        path: 'team',
        component: TeamComponent,
        children: [
          { path: '', component: TeamTasksComponent },
        ]
      },
      {
        path: 'team/invite',
        component: InviteTeamComponent,
      },
      {
        path: 'accept-invite',
        component: AcceptInviteComponent,
      },
      { path: 'notification', component: NotificationComponent },
      { path: 'time', component: TimeComponent },
      {
        path: 'portfolio',
        component: ProjectListComponent,
      },
      { path: 'details', component: ProjectDetailsComponent },
      { path: 'new/create', component: ProjectAddComponent },
      { path: 'edit/:id', component: EditProjectComponent },
      { path: 'task/create', component: CreateTaskComponent },
      { path: 'edit/task/:id', component: EditTaskComponent },
    ],
    canActivate: [authGuard],
  },
];
