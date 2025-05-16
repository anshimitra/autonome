import { Component, OnInit } from '@angular/core';
import { LogoComponent } from '../../../shared/widgets/logo/logo.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleAuthService } from '../../../shared/services/auth/google-auth.service';
import { PrimeNgModule } from '../../../primeng/primeng.module';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, LogoComponent, RouterModule, FormsModule, PrimeNgModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService, GoogleAuthService]
})
export class LoginComponent implements OnInit {
  isFormValid() {
    throw new Error('Method not implemented.');
  }

  user!: any;
  loggedIn!: boolean;

  email: string = '';
  password: string = '';

  constructor(private googleAuthService: GoogleAuthService) {}

  ngOnInit() {}

  signInWithGoogle() {
    this.googleAuthService.login();
  }
  show() {
}
  clickHandler() {
    // if (this.password.length < 6) {
    //   console.log('password is too small');
    // } else {
    //   console.log('password is valid');
    // }
    // alert('Email = ' + this.email + 'Password = ' + this.password);
  }
}
