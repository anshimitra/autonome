import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProjectInterface } from '../../../../../shared/interface/project.interface';
import { HttpClient } from '@angular/common/http';
import { error, log } from 'console';
import { ProjectService } from '../../../../../shared/services/project.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  @Input() project!: ProjectInterface;
  @Output() onDelete = new EventEmitter();
  @Output() onEdit = new EventEmitter(); // Emit event for edit

  constructor(private router: Router) {}

  onProjectClick(project: ProjectInterface) {
    this.router.navigate(['project/details'], {
      queryParams: { projectId: project.id },
    });
  }
}
