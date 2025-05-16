import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { TeamCardComponent } from '../../widgets/team-card/team-card.component';
import { TeamService } from '../../../../../shared/services/team.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TeamInterface } from '../../../../../shared/interface/project.interface';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, RouterModule, TeamCardComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent implements OnInit {
  public teams!: TeamInterface[];
  projectId: any;

  constructor(private teamService: TeamService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.projectId = params['projectId'];
      this.getTeams(this.projectId);
    });
  }

  ngOnInit(): void {}

  getTeams(projectId: string) {
    this.teamService.getTeamByProjectId(projectId).subscribe(
      (res: TeamInterface[]) => {
        this.teams = res;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}
