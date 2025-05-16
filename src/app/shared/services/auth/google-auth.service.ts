import { Injectable, importProvidersFrom } from '@angular/core';
// import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { Member } from '../../interface/member.interface';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  baseUrl = environment.baseUrl;

  constructor(
    private afAuth: AngularFireAuth,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {}

  login() {
    const provider = new auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(provider).then(
      (res) => {
        const user = res.user;
        const payload: Member = {
          id: user?.uid! as string,
          email: user?.email!,
          name: user?.displayName! as string,
          photoURL: user?.photoURL!,
          status: true,
          role: 10,
          createdAt: new Date().toLocaleString(),
        };
        // check user if user is already in db.json then login else save the data
        this.getUserByEmail(payload.email).subscribe((res) => {
          if (res.length > 0) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'You are loggedIn',
            });
            localStorage.setItem('user', JSON.stringify(res[0]));
            setTimeout(()=>{
              this.router.navigate(['/project'], {
                queryParams: { userId: res[0].id },
              });
            }, 2000);
          } else {
            this.addUser(payload).subscribe(
              (res) => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'You are registered',
                });
                localStorage.setItem('user', JSON.stringify(res));
                setTimeout(()=>{
                  this.router.navigate(['/project'], {
                    queryParams: { userId: payload.id },
                  });
                }, 2000);
              },
              (err) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Error Adding User',
                });
                console.log('Error Adding User', err);
              }
            );
          }
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Login failed',
          });
        });
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Login failed',
        });
      }
    );
  }

  addUser(user: Member) {
    return this.http.post<Member>(`${this.baseUrl}/users`, user);
  }

  getUserByEmail(email: string) {
    return this.http.get<Member[]>(`${this.baseUrl}/users?email=${email}`);
  }
}
