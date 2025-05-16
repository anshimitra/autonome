import { Component } from '@angular/core';
import { LogoComponent } from '../../../shared/widgets/logo/logo.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [LogoComponent,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

}
