import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TaskInterface } from '../interface/project.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  addTask(payload: TaskInterface) {
    return this.http.post<TaskInterface>(`${this.baseUrl}/tasks`, payload);
  }

  editTask(payload: TaskInterface) {
    return this.http.put<TaskInterface>(
      `${this.baseUrl}/tasks/${payload.id}`,
      payload
    );
  }

  deleteTaskById(taskId: string) {
    return this.http.delete<TaskInterface[]>(`${this.baseUrl}/tasks/${taskId}`);
  }

  getTaskById(id: string) {
    return this.http.get<TaskInterface>(`${this.baseUrl}/tasks/${id}`);
  }

  // getData(id: string) {
  //   return this.http.get<ProjectInterface>(`${this.baseUrl}$/projects/${id}`);
  // }
}
