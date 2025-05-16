import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectInterface } from '../../../../../../shared/interface/project.interface';
import { ProjectService } from '../../../../../../shared/services/project.service';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss',
})
export class EditProjectComponent {
  id: any;
  project!: ProjectInterface;

  projectForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe((param) => (this.id = param['id']));
    this.projectForm = this.fb.group({
      id: new FormControl(''),
      title: new FormControl('', { validators: [Validators.required] }),
      details: new FormControl(''),
      url: new FormControl(''),
      createdAt: new FormControl(''),
      status: new FormControl(''),
      tasks: new FormControl(''),
      deadline: new FormControl(null),
      estimateCost: [0, Validators.required]
    });
    this.getProjectById();
  }

  getProjectById() {
    this.projectService.getProjectByIdWithTasks(this.id).subscribe(
      (res: any) => {
        this.project = res;
        this.projectForm.patchValue(this.project);
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  update() {
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
        createdAt: this.project.createdAt,
        status: this.project.status,
        tasks: this.project.tasks,
        deadline: this.projectForm.value.deadline!,
        progress: this.project.progress,
        member: this.project.member,
        leader: this.project.leader,
        estimateCost: this.projectForm.value.estimateCost!,
      };
      this.projectService.editProject(project, this.id).subscribe(
        (res: any) => {
          console.log(res);
          this.router.navigate(['/project/portfolio']);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
  }
}
