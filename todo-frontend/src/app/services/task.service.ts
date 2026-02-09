import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private api = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) {}

  // Get all tasks
  getTasks() {
    return this.http.get(this.api);
  }

  // Add new task
  addTask(task: any) {
    return this.http.post(this.api, task);
  }

  // Update task (for edit and status toggle)
  updateTask(id: number, task: any) {
    return this.http.put(`${this.api}/${id}`, task);
  }

  // Delete task
  deleteTask(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
