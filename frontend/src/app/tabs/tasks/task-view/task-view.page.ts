import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/model/task';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.page.html',
  styleUrls: ['./task-view.page.scss'],
})
export class TaskViewPage implements OnInit {

  taskId = null;
  public allTasks: Task[] = [];
  public editTask: Task;

  constructor(private activatedRoute: ActivatedRoute, private tasksService: TasksService) { }

  ngOnInit() {
    this.taskId = this.activatedRoute.snapshot.paramMap.get('id');
    this.editTask = this.tasksService.allTasks[this.taskId]
  }

  overrideTask() {
    // TODO Task mit Forulardaten abfüllen und in DB schreiben
  }
 
  

}
