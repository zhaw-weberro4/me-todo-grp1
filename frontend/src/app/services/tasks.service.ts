import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from '../model/task'

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  updatedTasks = new EventEmitter<Task[]>();
  tasksLoaded = new EventEmitter<boolean>();

  constructor(private http: HttpClient, private router: Router) { }
  private apiUrl: string = 'http://localhost:8080/api';

  public getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl + '/tasks', { withCredentials: true });
  }

  public addNewTask(newTask: Task) {
    return this.http.post(this.apiUrl + '/task', newTask, { withCredentials: true });
  }

  public updateTask(editTask: Task) {
    return this.http.put(this.apiUrl + '/task', editTask, { withCredentials: true });
  }

  public getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(this.apiUrl + '/task/' + id, { withCredentials: true });
  }

  public getTaskByDueDate(date): Observable<Task[]> {
    const dt = new Date(date);
    return this.http.get<Task[]>(this.apiUrl + '/tasks/' + dt.toISOString(), { withCredentials: true });
  }

  public getTaskByProject(id) {
    return this.http.get<Task[]>(this.apiUrl + '/tasks/project/' + id, { withCredentials: true });
  }

  public getTaskByTag(id) {
    return this.http.get<Task[]>(this.apiUrl + '/tasksByTag/' + id, { withCredentials: true });
  }

  public deleteTask(deleteTask: Task) {
    console.log(deleteTask.id)
    return this.http.delete(this.apiUrl + '/task/' + deleteTask.id, { withCredentials: true });
    
  }
}

 


