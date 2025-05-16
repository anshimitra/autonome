import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.scss',
})
export class ProjectDashboardComponent implements OnInit {
  greetingMessage: string = '';
  currentTime: string = '';
  currentDate: string = '';
  intervalId: any;

  constructor() {}
  ngOnInit(): void {
    this.greetingMessage = `Hello! Welcome to the project dashboard.`;
    this.updateTimeAndDate();
    // Call updateTimeAndDate every second (1000 milliseconds).
    // this.intervalId = setInterval(() => this.updateTimeAndDate(), 1000);
  }

  updateTimeAndDate(): void {
    const date = new Date();
    // setInterval(this.displayTimeAndDate, 1000);
    // Call once immediately to display the correct time and date when the page loads
    this.displayTimeAndDate(date);
  }

  displayTimeAndDate = (date: Date): void => {
    this.greetingMessage = this.getGreetingMessage(date.getHours());
    this.currentTime = date.toLocaleTimeString('en-US', { hour12: true }); // AM/PM format
    this.currentDate = date.toLocaleDateString();
  };

  //   this.intervalId = setInterval(() => {
  //     this.greetingMessage = this.getGreetingMessage(date.getHours());
  //     this.currentTime = date.toLocaleTimeString('en-US', { hour12: true }); // AM/PM format
  //     this.currentDate = date.toLocaleDateString();
  //   }, 1000);
  // }

  getGreetingMessage(hour: number): string {
    if (hour >= 5 && hour < 12) {
      return 'Good Morning';
    } else if (hour >= 12 && hour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }

  // ngOnDestroy(): void {
  //   clearInterval(this.intervalId); // Clear interval to prevent memory leaks
  // }
}
