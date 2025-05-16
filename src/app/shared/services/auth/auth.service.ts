import { Injectable, afterNextRender } from '@angular/core';
import { Member } from '../../interface/member.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://api.sciaku.com/api/email/awsSes/sendmail';
  private authToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJneWFuMiIsImV4cCI6MTcxNzgzMDE4OCwiaWF0IjoxNzE3NzQzNzg4fQ.djsE0u0Rve2Aa4CGqJuVzSUnDgNZbrL9Z9Lw_iLHL28'; // Replace with your actual token

  constructor(private http: HttpClient) {}

  get user() {
    return JSON.parse(localStorage.getItem('user')!) as Member;
  }

  logout() {
    localStorage.removeItem('user');
    window.location.reload();
  }

  public sendMail(mailData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(this.apiUrl, mailData, { headers });
  }

  getUserByEmail(email: string) {
    return this.http.get<Member[]>(
      `${environment.baseUrl}/users?email=${email}`
    ); // Replace with your actual API endpoint
  }
}
