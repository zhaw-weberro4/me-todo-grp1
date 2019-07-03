import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/model/task';
import {take} from 'rxjs/operators';
import {ProjectsService} from '../../services/projects.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  constructor(private router: Router, private tasksService: TasksService, private activatedRoute: ActivatedRoute, private projectService: ProjectsService) { }

  taskId: number = 1;
  public allTasks: Task[] = [];
  public newTask: Task = new Task();
  public pageTitle: String = "";

  ngOnInit() {
    this.pageTitle = this.activatedRoute.snapshot.data["pageTitle"];

    if (this.activatedRoute.snapshot.params["projectId"] != null) {
      const projectId: number = this.activatedRoute.snapshot.params["projectId"];
      console.log(projectId);
      this.projectService.findById(projectId).subscribe((data) => {
        console.log(data);
        this.pageTitle = this.pageTitle + " " + data.title;
      }, (error) => {
        console.log(error);
      })
    } else if (this.activatedRoute.snapshot.params["startDate"] != null) {

    } else if (this.activatedRoute.snapshot.params["todayDate"] != null) {


    }
  }


  async addTask() {
    if (this.newTask.title != null && this.newTask.title != "") {
      this.tasksService.addNewTask(this.newTask).subscribe(
        data => {
          console.log("Successfully added new todo.");
          this.newTask = new Task();
          this.reloadAllTasks();
        }, err => {
          console.log(err);
          this.router.navigateByUrl('/login');
        }
      );
    }
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
        this.router.navigateByUrl('/login');
      }
    );
  }

  public reloadAllTasks() {
    this.tasksService.getAllTasks().subscribe(
      data => {
        this.allTasks = data;
      }, err => {
        console.log(err);
        this.router.navigateByUrl('/login');
      }
    );
  }

  deleteTask(task: Task) {
    alert("I will delete the task " + task.title);
  }
}
