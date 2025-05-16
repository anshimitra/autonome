import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeamInterface } from '../../../../../shared/interface/project.interface';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './team-card.component.html',
  styleUrl: './team-card.component.scss',
})
export class TeamCardComponent {
  @Input() team!: TeamInterface;
}
