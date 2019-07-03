import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {TasksService} from "../../services/tasks.service";
import {Task} from "../../model/task";
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectsService} from '../../services/projects.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, OnChanges {

  constructor(private tasksService: TasksService, private activatedRoute: ActivatedRoute, private projectService: ProjectsService) { }

  @Input("selectedDate") selectedDate: Date;

  public allTasks: Task[] = [];

  ngOnInit() {


    if (this.activatedRoute.snapshot.params["projectId"] != null) {
        const projectId: number = this.activatedRoute.snapshot.params["projectId"];
        this.reloadTaskByProject(projectId);

    } else if (this.activatedRoute.snapshot.params["startDate"] != null) {
        console.log(this.activatedRoute.snapshot.params["startDate"]);
        console.log(this.activatedRoute.snapshot.params["endDate"]);
        const startDate: Date = new Date(this.activatedRoute.snapshot.params["startDate"]);
        const todayDate: Date = new Date(this.activatedRoute.snapshot.params["endDate"]);
    } else if (this.activatedRoute.snapshot.params["todayDate"] != null) {

        const todayDate: Date = new Date(this.activatedRoute.snapshot.params["todayDate"]);

        this.tasksService.getTaskByDueDate(todayDate).subscribe(
            (data) => {
                this.allTasks = data;
            }, (err) => {
                console.log(err);
            }
        );
    } else if (this.selectedDate) {
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

  public reloadTaskByProject(id) {
      this.tasksService.getTaskByProject(id).subscribe((data) => {
          this.allTasks = data;
      }, (error) => {
          console.log(error);
      });
  }

  public reloadTaskByTimeInterval(startDate, endDate) {

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
