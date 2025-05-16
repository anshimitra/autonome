import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../../../../../../shared/services/team.service';
import { AuthService } from '../../../../../../shared/services/auth/auth.service';
import { JsonPipe } from '@angular/common';
import { ProjectService } from '../../../../../../shared/services/project.service';
import {
  ProjectInterface,
  TeamInterface,
} from '../../../../../../shared/interface/project.interface';

@Component({
  selector: 'app-accept-invite',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './accept-invite.component.html',
  styleUrl: './accept-invite.component.scss',
})
export class AcceptInviteComponent {
  projectId: any;
  email: any;
  project!: ProjectInterface;
  message: string = '';

  constructor(
    private teamService: TeamService,
    public auth: AuthService,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.projectId = params['projectId'];
      this.email = params['email'];
      this.getProjectById(this.projectId);
    });
  }

  getProjectById(projectId: string) {
    this.projectService.getProjectByIdWithTasks(projectId).subscribe((res: ProjectInterface) => {
      this.project = res;
      if (this.auth.user.email === this.email) {
        this.saveTeam();
      }
    });
  }

  saveTeam() {
    const payload: TeamInterface = {
      email: this.auth.user.email,
      projectId: this.project.id,
    };
    this.teamService
      .getTeamByUserAndProject(payload.email, payload.projectId)
      .subscribe((res) => {
        if (res.length === 0) {
          this.teamService.addTeamToProject(payload).subscribe((res: any) => {
            this.message = `You have successfully accepted the invitation in <strong>${this.project.title}</strong>.`;
          });
        } else {
          this.message = `You have already accepted the invitation in <strong>${this.project.title}</strong>.`;
        }
      });
  }
}
