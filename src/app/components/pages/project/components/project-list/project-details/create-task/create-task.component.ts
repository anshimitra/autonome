import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../../../../../../shared/services/task.service';
import {
  TaskInterface,
  TeamInterface,
} from '../../../../../../../shared/interface/project.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../../../../../../../shared/services/team.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [NgIf, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent implements OnInit {
  showPlaceholder = false;
  taskName = '';

  @Input() task?: TaskInterface;

  taskForm!: FormGroup;
  projectId!: string;
  teams!: TeamInterface[];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      this.projectId = params['projectId'];
    });
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [this.task?.title || '', Validators.required],
      description: [this.task?.description || '', Validators.required],
      assignedTo: ['', Validators.required],
      dueDate: [this.task?.dueDate || '', Validators.required],
      cost: [0, Validators.required],
      status: [0, Validators.required],
      // Add other fields as needed
    });
    this.getTeamByProjectId();
  }

  getTeamByProjectId() {
    this.teamService.getTeamByProjectId(this.projectId).subscribe((teams) => {
      this.teams = teams;
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const payload: TaskInterface = {
        title: this.taskForm.get('title')?.value,
        status: this.taskForm.get('status')?.value,
        description: this.taskForm.get('description')?.value,
        dueDate: this.taskForm.get('dueDate')?.value,
        projectId: this.projectId,
        teamId: this.taskForm.get('assignedTo')?.value,
        cost: this.taskForm.get('cost')?.value as number,
      };

      if (this.task && this.task!.id) {
        // this.taskService.updateTask(taskData).subscribe({
        //   next: (updatedTask) => this.taskUpdated.emit(updatedTask),
        //   error: (err) => console.error('Update failed', err),
        // });
      } else {
        this.taskService.addTask(payload).subscribe({
          next: (newTask) => {
            this.task = newTask;
            alert("Task is assigned successfully!");
            this.router.navigate(['project/details'], {queryParams: {projectId: this.projectId}})
          },
          error: (err) => console.error('Creation failed', err),
        });
      }
    }
  }
}



//     {
//   "id": "f83b",
//   "title": "Create Login Page",
//   "status": "1",
//   "description": "Create Login Page",
//   "assignedTo": "Anshi Mitra",
//   "labels": [],
//   "dueDate": "2024-05-24",
//   "columnId": "",
//   "cardId": "",
//   "comments": [],
//   "attachments": [],
//   "timeSpent": 0,
//   "timeEstimated": 0,
//   "members": [],
//   "subTasks": [],
//   "isSubTask": false,
//   "showSubTasks": false,
//   "parentTask": null,
//   "overridden": false,
//   "editable": false,
//   "removable": false,
//   "canAddSubTask": false,
//   "canRemove": false,
//   "canEdit": false,
//   "canDelete": false,
//   "tags": [],
//   "tagColors": [],
//   "checklistItems": [],
//   "projectId": "91db1180-2c13-43b2-9d78-d11752d176f8"
// },
