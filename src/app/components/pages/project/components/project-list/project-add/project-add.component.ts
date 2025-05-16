import { Component } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ProjectService } from '../../../../../../shared/services/project.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ProjectInterface,
  TeamInterface,
} from '../../../../../../shared/interface/project.interface';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from '../../../../../../shared/services/auth/auth.service';
import { TeamService } from '../../../../../../shared/services/team.service';

@Component({
  selector: 'app-project-add',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './project-add.component.html',
  styleUrl: './project-add.component.scss',
})
export class ProjectAddComponent {
  projectForm: FormGroup;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private teamService: TeamService
  ) {
    this.projectForm = this.fb.group({
      id: [uuidv4(), Validators.required],
      title: ['', Validators.required],
      details: ['', Validators.required],
      deadline: ['', Validators.required],
      estimateCost: [0, Validators.required],
    });
  }

  add() {
    if (this.projectForm.valid) {
      let url: string = this.projectForm.value.title!;
      url = url.toLowerCase();
      url = url.replace(/[^\w\s]/gi, '');
      url = url.replace(/\s+/g, '-');
      const project: ProjectInterface = {
        id: this.projectForm.value.id!,
        title: this.projectForm.value.title!,
        url: url,
        details: this.projectForm.value.details!,
        createdAt: new Date(),
        status: 'Start',
        tasks: [],
        deadline: this.projectForm.value.deadline!,
        progress: 0,
        member: [this.authService.user.id],
        leader: this.authService.user.id,
        estimateCost: this.projectForm.value.estimateCost!,
      };
      this.projectService.addProject(project, 0).subscribe(
        (res: ProjectInterface) => {
          this.saveTeam(res.id);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
  }

  saveTeam(projectId: string) {
    const payload: TeamInterface = {
      email: this.authService.user.email,
      projectId: projectId,
    };
    this.teamService
      .addTeamToProject(payload)
      .subscribe((res: TeamInterface) => {
        this.router.navigate(['/project/portfolio']);
      });
  }
}
