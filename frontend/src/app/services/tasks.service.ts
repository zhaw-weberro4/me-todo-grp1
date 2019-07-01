import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from '../model/task'

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  allTasks: Task[] = [
    {
      id: 1,
      title: "Budget erstellen",
      project: {
        id: 1,
        name: "Bonfire",
        predefined: false
      },
      tags: [
        {
          id: 1,
          name: "Finance",
        },
        {
          id: 2,
          name: "High Priority",
        }
      ],
      archived: false,
      done: false,
      anytime: false
    },
    {
      id: 2,
      title: "Finishing Calendar",
      project: {
        id: 2,
        name: "Skyfall",
        predefined: false
      },
      tags: [
        {
          id: 3,
          name: "IT",
        },
        {
          id: 4,
          name: "Middle Priority",
        }
      ],
      archived: false,
      done: false,
      anytime: false
    },
    {
      id: 3,
      title: "Call Amy",
      project: {
        id: 3,
        name: "Today",
        predefined: true
      },
      tags: [
        {
          id: 5,
          name: "Phone Call",
        }
      ],
      archived: false,
      done: false,
      anytime: false
    }
  ];

  updatedTasks = new EventEmitter<Task[]>();
  tasksLoaded = new EventEmitter<boolean>();

  constructor(private http: HttpClient, private router: Router) { }
  private apiUrl: string = 'http://localhost:8080';

  public getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl + '/api/todo', { withCredentials: true });
  }

  public addNewTask(newTask: Task) {
    return this.http.post(this.apiUrl + '/api/todo', newTask, { withCredentials: true });
  }

  public updateTask(task: Task) {
    console.log("###");
    console.log(task);
    return this.http.put(this.apiUrl + '/api/todo', task, { withCredentials: true });
  }
}
