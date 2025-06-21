import { Component, inject, OnInit, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule, MatCardActions } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common'; 

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { CreateTaskResponse, ListTaskResponse, StatusT } from '../../types/auth';
import { InsertTask } from '../../types/auth';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardActions,
    MatProgressSpinnerModule,
    MatRadioModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  auth = inject(AuthService);
  taskService = inject(TaskService);
  private router = inject(Router);

  user = this.auth.user;

  cards = signal<ListTaskResponse>([]);

  showCreateTaskForm = signal(false);
  showUpdateTaskForm = signal(false);

  newTask = signal<InsertTask>({ idUser: this.user()?.id!, title: '', description: '', status: 'Pending' });

  updateTask = signal<CreateTaskResponse>({ id: 0, idUser: this.user()?.id!, title: '', description: '', status: 'Pending' })

  ngOnInit(): void {
    console.log(this.cards())
    const token = this.auth.accessToken();
    this.taskService.getTasks(token!)
    .then((tasks) => {
      this.cards.set(tasks);
      console.log(this.cards)
    })
    .catch(e => console.error('Error al obtener perfiles:', e));   
  }

  logout() {
    this.auth.logout().then((message) => {
      if (message.ok) {
        this.auth.clearSession();
        this.router.navigate(['/auth']);
      }
    }).catch(e => console.log(e));
    console.log('Cerrar sesión');
  }

  showUserInfo() {
    console.log('Mostrar info de usuario');
  }

  openCreateTaskForm() {
    this.showCreateTaskForm.set(true);
    this.newTask.set({ idUser: this.user()?.id!, title: '', description: '', status: 'Pending' });
  }

  closeCreateTaskForm() {
    this.showCreateTaskForm.set(false);
  }

  openUpdateTaskForm(task: CreateTaskResponse) {
    this.showUpdateTaskForm.set(true);
    this.updateTask.set({ id: task.id, idUser: task.idUser, title: task.title, description: task.description, status: task.status });
  }

  closeUpdateTaskForm() {
    this.showUpdateTaskForm.set(false);
  }

  async createTask() {
    const token = this.auth.accessToken();
    if (!token) {
      console.error('No se encontró un token de acceso para crear el perfil.');
      return;
    }

    try {
      const createdTask = await this.taskService.createTask(this.newTask(), token);
      console.log('Perfil creado:', createdTask);

      this.cards.update(currentCards => [...currentCards, createdTask]);

      this.closeCreateTaskForm();
    } catch (error) {
      console.error('Error al crear el perfil:', error);
    }
  }

  async updateTaskFunc() {
    const token = this.auth.accessToken();
    if (!token) {
      console.error('No se encontró un token de acceso para crear el perfil.');
      return;
    }
    const data: any = this.updateTask();
    delete data.id;
    try {
      const task = await this.taskService.updateTask(token, this.updateTask().id, data);
      console.log('Tarea editada:', task);

      this.cards.update(currentCards => currentCards.map(card => {
        if (card.id == task.id)
          return task;
        else return card;
      }));

      this.closeUpdateTaskForm();
    } catch (error) {
      console.error('Error al crear el perfil:', error);
    }
  }

  async deleteTaskFunc(taskId: number) {
    const token = this.auth.accessToken();
    if (!token) {
      console.error('No se encontró un token de acceso para crear el perfil.');
      return;
    }
    try {
      const task = await this.taskService.deleteTask(token, taskId);
      console.log('Tarea eliminada:', task);

      this.cards.update(currentCards => currentCards.filter(card => card.id !== task.id));
    } catch (error) {
      console.error('Error al crear el perfil:', error);
    }
  }

  async refreshList(filter: StatusT) {
    const token = this.auth.accessToken();
    this.taskService.getTasks(token!, filter)
    .then((tasks) => {
      this.cards.set(tasks);
      console.log(this.cards)
    })
    .catch(e => console.error('Error al obtener perfiles:', e));  
  }
}