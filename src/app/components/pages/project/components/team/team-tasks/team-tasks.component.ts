import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../../../../../../shared/services/team.service';
import { TeamInterface } from '../../../../../../shared/interface/project.interface';

@Component({
  selector: 'app-team-tasks',
  standalone: true,
  imports: [],
  templateUrl: './team-tasks.component.html',
  styleUrl: './team-tasks.component.scss',
})
export class TeamTasksComponent {
  teamId: any;
  team!: TeamInterface;

  constructor(private route: ActivatedRoute, private teamService: TeamService) {
    this.route.queryParams.subscribe((params) => {
      this.teamId = params['teamId'];
      this.getTeamById(this.teamId);
    });
  }

  getTeamById(teamId: string) {
    this.teamService.getTeamById(teamId).subscribe((res) => {
      this.team = res;
    });
  }
}
