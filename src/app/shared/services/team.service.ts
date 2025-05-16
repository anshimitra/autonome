import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TeamInterface } from '../interface/project.interface';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  addTeamToProject(payload: TeamInterface) {
    return this.http.post<TeamInterface>(`${this.baseUrl}/teams`, payload);
  }

  getTeams() {
    return this.http.get<TeamInterface[]>(`${this.baseUrl}/teams`); //?_sort=id&_order=desc
  }

  getTeamByUserAndProject(email: string, projectId: string) {
    return this.http.get<TeamInterface[]>(
      `${this.baseUrl}/teams?email=${email}&projectId=${projectId}`
    );
  }

  getTeamByProjectId(projectId: string) {
    return this.http.get<TeamInterface[]>(
      `${this.baseUrl}/teams?projectId=${projectId}&_embed=tasks`
    );
  }

  getTeamById(id: string) {
    return this.http.get<TeamInterface>(`${this.baseUrl}/teams/${id}?_embed=tasks`);
  }
}
