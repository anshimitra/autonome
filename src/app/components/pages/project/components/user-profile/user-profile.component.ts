import { Component } from '@angular/core';
import { Member } from '../../../../../shared/interface/member.interface';
import { AuthService } from '../../../../../shared/services/auth/auth.service';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CardModule, CommonModule ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  profile!: Member;

  constructor(private authService: AuthService) {
    this.profile = authService.user;
  }

}
