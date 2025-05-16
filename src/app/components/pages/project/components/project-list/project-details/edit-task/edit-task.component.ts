import { Component, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  TaskInterface,
  TeamInterface,
} from '../../../../../../../shared/interface/project.interface';
import { TaskService } from '../../../../../../../shared/services/task.service';
import { TeamService } from '../../../../../../../shared/services/team.service';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
})
export class EditTaskComponent {
  showPlaceholder = false;
  taskName = '';

  @Input() task?: TaskInterface;

  taskForm!: FormGroup;
  projectId!: string;
  teams!: TeamInterface[];
  taskId: any;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.projectId = params['id'];
    });
    this.route.queryParams.subscribe((params) => {
      this.taskId = params['taskId'];
      this.getTaskById(this.taskId);
    });
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [this.task?.title || '', Validators.required],
      description: [this.task?.description || ''],
      assignedTo: ['', Validators.required],
      dueDate: [this.task?.dueDate || '', Validators.required],
      cost: [0, Validators.required],
      status: [0, Validators.required],
      // Add other fields as needed
    });
    this.getTeamByProjectId();
  }

  getTaskById(taskId: string) {
    this.taskService.getTaskById(taskId).subscribe((task: TaskInterface) => {
      this.task = task;
      this.taskForm.patchValue({
        title: task.title,
        description: task.description,
        assignedTo: task.teamId,
        dueDate: task.dueDate,
        cost: task.cost,
        status: task.status,
      });
    });
  }

  getTeamByProjectId() {
    this.teamService.getTeamByProjectId(this.projectId).subscribe((teams) => {
      this.teams = teams;
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const payload: TaskInterface = {
        id: this.task?.id,
        title: this.taskForm.get('title')?.value,
        status: this.taskForm.get('status')?.value,
        description: this.taskForm.get('description')?.value,
        dueDate: this.taskForm.get('dueDate')?.value,
        projectId: this.projectId,
        teamId: this.taskForm.get('assignedTo')?.value,
        cost: this.taskForm.get('cost')?.value as number,
      };

      if (this.task && this.task!.id) {
        this.taskService.editTask(payload).subscribe({
          next: (updatedTask) => {
            alert('Task is updated successfully!');
            this.router.navigate(['project/details'], {
              queryParams: { projectId: this.projectId },
            });
          },
          error: (err) => console.error('Update failed', err),
        });
      }
    }
  }
}
