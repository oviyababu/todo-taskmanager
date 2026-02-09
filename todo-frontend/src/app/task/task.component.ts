import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {

  username: string = '';
  todayDisplay: string = '';
  minDate: string = '';
  tasks: any[] = [];

  isEditMode: boolean = false;
  editTaskId: number | null = null;

  newTask = {
    title: '',
    description: '',
    dueDate: '',
    status: 'PENDING'
  };

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || 'User';

    const today = new Date();
    this.todayDisplay = today.toDateString();
    this.minDate = today.toISOString().split('T')[0];

    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data: any) => {
      this.tasks = data;
    });
  }

addTask() {
  // prevent completely empty task
  if (!this.newTask.title && !this.newTask.description) {
    return;
  }

  if (this.isEditMode && this.editTaskId !== null) {
    this.taskService.updateTask(this.editTaskId, this.newTask).subscribe(() => {
      this.resetForm();
      this.loadTasks();
    });
  } else {
    this.taskService.addTask(this.newTask).subscribe(() => {
      this.resetForm();
      this.loadTasks();
    });
  }
}

 editTask(task: any) {
  this.newTask = {
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    status: task.status
  };
  this.isEditMode = true;
  this.editTaskId = task.id;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  toggleStatus(task: any) {
    task.status = task.status === 'PENDING' ? 'COMPLETED' : 'PENDING';
    this.taskService.updateTask(task.id, task).subscribe(() => {
      this.loadTasks();
    });
  }

  resetForm() {
    this.newTask = {
      title: '',
      description: '',
      dueDate: '',
      status: 'PENDING'
    };
    this.isEditMode = false;
    this.editTaskId = null;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/exit']);
  }

  // =========================
  // RICH TEXT FUNCTIONS
  // =========================
  format(command: string) {
    document.execCommand(command, false, '');
  }

  updateDescription(event: any) {
    this.newTask.description = event.target.innerHTML;
  }
}
