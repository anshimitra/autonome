import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingHeaderComponent } from '../../../shared/components/header/landing-header/landing-header.component';
import { LandingFooterComponent } from '../../../shared/components/footer/landing-footer/landing-footer.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [LandingHeaderComponent, LandingFooterComponent, RouterOutlet],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
