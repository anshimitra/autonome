import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoComponent } from '../../../widgets/logo/logo.component';

@Component({
  selector: 'app-landing-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LogoComponent],
  templateUrl: './landing-header.component.html',
  styleUrl: './landing-header.component.scss',
})
export class LandingHeaderComponent {
  showMenu = false;
  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }
}
