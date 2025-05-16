import { Component, OnInit, afterNextRender } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProjectService } from '../../../../../shared/services/project.service';
import {
  ProjectInterface,
  TeamInterface,
} from '../../../../../shared/interface/project.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjectCardComponent } from '../../widgets/project-card/project-card.component';
import { AuthService } from '../../../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
  imports: [RouterModule, ProjectCardComponent],
})
export class ProjectListComponent implements OnInit {
  public projects: ProjectInterface[] = [];
  assignedProjects: TeamInterface[] = [];

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getAssignedProjectsByEmail();
  }

  getAssignedProjectsByEmail() {
    this.projectService
      .getAssignedProjectsByEmail(this.auth.user.email)
      .subscribe((data: any) => {
        this.assignedProjects = data;
        for (let index = 0; index < this.assignedProjects.length; index++) {
          const element = this.assignedProjects[index];
          this.getProjectByIdWithTasks(element.projectId);
        }
      });
  }

  getProjectByIdWithTasks(id: string) {
    this.projectService
      .getProjectByIdWithTasks(id)
      .subscribe((data: ProjectInterface) => {
        this.projects.push(data);
      });
  }

  getProjects() {
    this.projectService
      .getProjectsByLeaderWithTasks(this.auth.user.id)
      .subscribe(
        (res: ProjectInterface[]) => {
          this.projects = res;
          // this.projects.reverse();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  onEdit(id: string) {
    this.router.navigateByUrl('/project/edit/' + id);
  }

  onDelete(projectId: number) {
    if (confirm('Are you sure to delete this project?')) {
      this.projectService.deleteProject(projectId, 0).subscribe(
        (data) => {
          // console.log(data);
          this.getProjects();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
