import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../../../../shared/services/project.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ProjectInterface,
  TaskInterface,
} from '../../../../../../shared/interface/project.interface';
import { TaskService } from '../../../../../../shared/services/task.service';
import { TasksPipe } from '../../../../../../shared/pipes/tasks.pipe';
import { AuthService } from '../../../../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TasksPipe],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
})
export class ProjectDetailsComponent implements OnInit {
  [x: string]: any;
  id: any;
  project!: ProjectInterface;
  todoTasks!: TaskInterface[];
  inProgressTasks!: TaskInterface[];
  doneTasks!: TaskInterface[];
  reviewTasks!: TaskInterface[];

  taskNames: string[] = []; // Array to hold task names for each column

  isShow: number = -1;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private taskService: TaskService,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => (this.id = param['projectId']));
    this.getProjectById(this.id);
  }

  getProjectById(id: string) {
    this.projectService.getProjectByIdWithTasks(id).subscribe(
      (res: ProjectInterface) => {
        this.project = res;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  getRemainingDays(project: ProjectInterface) {
    let today = new Date();
    let projectEndDate = new Date(project.deadline);
    let days = Math.ceil(
      (projectEndDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );
    return days + ' Days';
  }

  getCurrentCosts(tasks: TaskInterface[]) {
    let totalCost = 0;
    for (let index = 0; index < tasks.length; index++) {
      const element = tasks[index];
      if (element.cost && element.status === '3') {
        totalCost += element.cost;
      }
    }
    return totalCost;
  }

  onAdd(index: number) {
    if (index == this.isShow) {
      this.isShow = -1;
      return;
    }
    this.isShow = index;
  }

  addTask(columnIndex: number) {
    const taskName = this.taskNames[columnIndex];
    if (taskName.trim() !== '') {
      let url: string = taskName!;
      url = url.toLowerCase();
      url = url.replace(/[^\w\s]/gi, '');
      url = url.replace(/\s+/g, '-');

      const payload: any = {
        title: taskName!,
        status: 'Start',
        description: '',
        assignedTo: '',
        labels: [],
        dueDate: new Date(),
        columnId: '',
        cardId: '',
        comments: [],
        attachments: [],
        timeSpent: 0,
        timeEstimated: 0,
        members: [],
        subTasks: [],
        isSubTask: false,
        showSubTasks: false,
        parentTask: null,
        overridden: false,
        editable: false,
        removable: false,
        canAddSubTask: false,
        canRemove: false,
        canEdit: false,
        canDelete: false,
        tags: [],
        tagColors: [],
        checklistItems: [],
        projectId: this.project.id,
      };
      this.taskService.addTask(payload).subscribe(
        (res: any) => {
          console.log(res);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
  }

  navigateToAddTask(projectId: string) {
    this.router.navigate([`/project/task/create`], {
      queryParams: { projectId: projectId },
    });
  }

  editTask(taskId: string) {
    this.router.navigate(['/project/edit/task/', this.project.id], {
      queryParams: { taskId: taskId },
    });
  }

  deleteTask(taskId: string) {
    if (confirm('Are you sure to delete this task?')) {
      this.taskService.deleteTaskById(taskId).subscribe(
        (res: any) => {
          this.getProjectById(this.id);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
  }

  getTaskTypeColor(status: string): string {
    switch (status) {
      case '0':
        return 'text-blue-500';
      case '1':
        return 'text-orange-500';
      case '2':
        return 'text-yellow-500';
      case '3':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  }

  taskColumns = [
    {
      name: 'To Do',
      key: '0',
      data: [{ name: 'Task Name' }, { name: 'Due Date' }],
    },
    {
      name: 'In Progress',
      key: '1',
      data: [],
    },
    {
      name: 'In Review',
      key: '2',
      data: [],
    },
    {
      name: 'Completed',
      key: '3',
      data: [],
    },
  ];
}
