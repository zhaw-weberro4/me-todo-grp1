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
      description: "Projekt Budget für Bonfire Projekt erstellen",
      dueDate: new Date(),
      project: {
        id: 1,
        title: "Bonfire",
        standard: false,
        user: "user"
      },
      tags: [
        {
          id: 1,
          title: "Finance",
            user: "user"
        },
        {
          id: 2,
          title: "High Priority",
            user: "user"
        }
      ],
      done: false,
      user: "user"

    },
    {
      id: 2,
      title: "Finishing Calendar",
      description: "Programming the calendar page for the GTD-App",
      dueDate: new Date(),
      project: {
        id: 2,
        title: "Skyfall",
        standard: false,
        user: "user"
      },
      tags: [
        {
          id: 3,
          title: "IT",
            user: "user"
        },
        {
          id: 4,
          title: "Middle Priority",
            user: "user"
        }
      ],
      done: false,
      user: "user"
    },
    {
      id: 3,
      title: "Call Amy",
      description: "Congrats Amy to her birthday",
      dueDate: new Date(),
      project: {
        id: 3,
        title: "Today",
        standard: true,
        user: "user"
      },
      tags: [
          {
            id: 5,
            title: "Phone Call",
            user: "user"
        }
      ],
      done: false,
      user: "user"
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
