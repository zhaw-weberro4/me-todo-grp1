import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {TasksService} from "../../services/tasks.service";
import {Task} from "../../model/task";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, OnChanges {

  constructor(private tasksService: TasksService) { }

  @Input("selectedDate") selectedDate: Date;

  public allTasks: Task[] = [];

  ngOnInit() {
    if(!this.selectedDate) {
        this.reloadAllTasks();
    } else {
      this.reloadTasksByDueDate(this.selectedDate);
    }
  }

  public reloadAllTasks() {
      this.tasksService.getAllTasks().subscribe(
          data => {
              this.allTasks = data;
          }, err => {
              console.log(err);
          }
      );
  }
  public reloadTasksByDueDate(date) {
      this.tasksService.getTaskByDueDate(date.date).subscribe(
          (data) => {
              this.allTasks = data;
          }, (err) => {
              console.log(err);
          }
      );
  }

  async finish(task: Task) {
      task.done = true;
      this.updateTask(task);
  }

  public updateTask(task: Task) {
      this.tasksService.updateTask(task).subscribe(
          (data) => {
              console.log("Successfully updated todo.");
              this.reloadAllTasks();
          }, err => {
              console.log(err);
          }
      );
  }

  deleteTask(task: Task) {
      alert("I will delete the task " + task.title);
  }

  onPutToSomewhen(task) {
      alert("The status of " + task.title + " was changed to somewhen");
  }

  ngOnChanges() {
      this.reloadTasksByDueDate(this.selectedDate);
  }

}
