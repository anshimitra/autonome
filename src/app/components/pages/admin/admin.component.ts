import { RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from '../../../shared/components/header/admin-header/admin-header.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminHeaderComponent, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
