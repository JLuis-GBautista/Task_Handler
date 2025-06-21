import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CreateTaskResponse, InsertTask, InsuranceRecommendationRequest, InsuranceRecommendationResponse, ListTaskResponse, StatusT } from '../types/auth';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  domain = environment.apiBack;

  async getTasks(token: string, select?: StatusT) {
    let params = new HttpParams();
    params.append("select", select || '');
    const tasks = await firstValueFrom(this.http.get<ListTaskResponse>(this.domain+'/user/tasks', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true,
      params
    }));
    return tasks;
  }

  async createTask(data: InsertTask, token: string) {
    return await firstValueFrom(this.http.post<CreateTaskResponse>(this.domain+'/user/task', data, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    }));
  }

  async updateTask(token: string, taskId: number, data: InsertTask) {
    return await firstValueFrom(this.http.put<CreateTaskResponse>(this.domain + '/user/task/' + taskId, data, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    }));
  }

  async deleteTask(token: string, taskId: number) {
  return await firstValueFrom(this.http.delete<CreateTaskResponse>(this.domain + '/user/task/' + taskId, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  }));
  }
}
