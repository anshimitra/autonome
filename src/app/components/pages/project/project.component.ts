import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectHeaderComponent } from '../../../shared/components/header/project-header/project-header.component';
import { PrimeNgModule } from '../../../primeng/primeng.module';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [ProjectHeaderComponent, RouterOutlet, PrimeNgModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {

}
