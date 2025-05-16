import { ProjectInterface } from './../interface/project.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getProjectsByLeaderWithTasks(userId: string) {
    return this.http.get<ProjectInterface[]>(
      `${this.baseUrl}/projects?leader=${userId}&_embed=tasks`
    );
  }

  getProjects() {
    return this.http.get<ProjectInterface[]>(`${this.baseUrl}/projects`);
  }

  addProject(project: ProjectInterface, userId: number) {
    return this.http.post<ProjectInterface>(
      `${this.baseUrl}/projects`,
      project
    );
  }

  editProject(project: ProjectInterface, projectId: number) {
    return this.http.put<ProjectInterface>(
      `${this.baseUrl}/projects/${projectId}`,
      project
    );
  }

  deleteProject(projectId: number, userId: number) {
    return this.http.delete<ProjectInterface[]>(
      `${this.baseUrl}/projects/${projectId}`
    );
  }

  getProjectByIdWithTasks(id: string) {
    return this.http.get<ProjectInterface>(
      `${this.baseUrl}/projects/${id}?_embed=tasks`
    );
  }

  getData(id: string) {
    return this.http.get<ProjectInterface>(`${this.baseUrl}$/projects/${id}`);
  }

  getAssignedProjectsByEmail(email: string) {
    return this.http.get<any[]>(`${this.baseUrl}/teams?email=${email}`);
  }
}
