import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  RouterModule } from '@angular/router';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss'
})
export class TimeComponent {

}
