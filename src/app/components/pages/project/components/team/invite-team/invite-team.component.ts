import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../../../../shared/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ProjectInterface } from '../../../../../../shared/interface/project.interface';
import { ProjectService } from '../../../../../../shared/services/project.service';

@Component({
  selector: 'app-invite-team',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './invite-team.component.html',
  styleUrl: './invite-team.component.scss',
})
export class InviteTeamComponent {
  inviteForm: FormGroup;
  mailObject: any = {
    to: '',
    subject: '',
    message: '',
    from: '',
    fromName: '',
    replyTo: '',
  };
  pId: any;
  project!: ProjectInterface;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.pId = params['projectId'];
      if (this.pId) {
        this.projectService.getProjectByIdWithTasks(this.pId).subscribe((res) => {
          this.project = res;
        });
      }
    });
    this.inviteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: [''],
    });
  }

  onSubmit() {
    if (this.inviteForm.valid) {
      const invitationData = this.inviteForm.value;
      this.mailObject.from = 'info@sciaku.com';
      this.mailObject.fromName = 'Sciaku (सियाकु)';
      this.mailObject.to = this.inviteForm.get('email')?.value;
      this.mailObject.replyTo = 'info@sciaku.com';
      this.mailObject.subject = 'Project Invitation';
      this.mailObject.message = `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Invitation</title>
    <style>
        /* Inline CSS for email */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #dddddd;
        }
        .header h1 {
            margin: 0;
            color: #333333;
        }
        .content {
            padding: 20px;
            color: #555555;
        }
        .content p {
            margin: 0 0 20px;
        }
        .button-container {
            text-align: center;
            margin-top: 30px;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            font-size: 16px;
            color: #ffffff;
            background-color: #007BFF;
            border-radius: 4px;
            text-decoration: none;
        }
        .button:hover {
            background-color: #0056b3;
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #dddddd;
            color: #777777;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>You're Invited!</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>You have been invited to join the project "<strong>${this.project.title}</strong>". Click the button below to accept the invitation and join the project.</p>
            <div class="button-container">
                <a href="https://autonome.sciaku.com/project/accept-invite?email=${invitationData.email}&projectId=${this.pId}" class="button">Join Project</a>
            </div>
            <p>If you have any questions, feel free to reply to this email.</p>
            <p>Best regards,<br>The Project Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Autonome. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
      `;
      this.auth.sendMail(this.mailObject).subscribe(
        (data: any) => {
          alert('Invitation is send successfully!!');
          this.inviteForm.reset();
        },
        (err: HttpErrorResponse) => {
          alert('Invitation Request is not send!!');
        }
      );
    }
  }
}
