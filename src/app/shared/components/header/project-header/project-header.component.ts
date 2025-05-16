import { Component, Input } from '@angular/core';
import { LogoComponent } from '../../../widgets/logo/logo.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-project-header',
  standalone: true,
  imports: [LogoComponent, RouterModule, CommonModule],
  templateUrl: './project-header.component.html',
  styleUrl: './project-header.component.scss',
})
export class ProjectHeaderComponent {
  showMenu = false;
  isProject: boolean = false;
  pId: string = '';

  @Input() class!: string | Array<string>;

  constructor(private route: ActivatedRoute, public auth: AuthService) {
    this.route.queryParams.subscribe((params) => {
      this.pId = params['projectId'];

      if (this.pId) {
        this.isProject = true;
      } else {
        this.isProject = false;
      }
    });
  }

  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }
}
