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

  constructor(private tasksService: TasksService, private activatedRoute: ActivatedRoute, 
    private projectService: ProjectsService, private router: Router) { }

  @Input("selectedDate") selectedDate: Date;

  public allTasks: Task[] = [];

  ngOnInit() {
    if (this.activatedRoute.snapshot.params["projectId"] != null) {
        const projectId: number = this.activatedRoute.snapshot.params["projectId"];
        this.reloadTaskByProject(projectId);

    } else if (this.activatedRoute.snapshot.params["tagId"] != null) {
        const tagId: number = this.activatedRoute.snapshot.params["tagId"];
        this.reloadTaskByTag(tagId);

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

  public reloadTaskByTag(id) {
      this.tasksService.getTaskByTag(id).subscribe((data) => {
          this.allTasks = data;
      }, (error) => {
          console.log(error);
      });
  }

  public reloadTaskByTimeInterval(startDate, endDate) {

  }

  async finish(task: Task) {
        task.done = true;
        const originProjectId: number = task.project.id;
        const editTask = task;
        editTask.project.id = 2;
        editTask.project.title = "Archive";
      this.tasksService.updateTask(editTask).subscribe((data) => {
          this.reloadTaskByProject(originProjectId);
          console.log(originProjectId)
      }, err => {
          console.log(err);
        
      }
    );
  }

  public updateTask(task: Task) {
      this.tasksService.updateTask(task).subscribe(
          (data) => {
              this.reloadTaskByProject(task.project.id);
          }
      );
  }

  onOpenTask(taskId: number){
    this.router.navigate(['/tabs/tasks/task-view/', taskId]);
  }

  deleteTask(task: Task) {
      alert("Task " + task.title + " will be deleted");
      const originProjectId: number = task.project.id;
      this.tasksService.deleteTask(task).subscribe((data) => {
        this.reloadTaskByProject(originProjectId);
        console.log(originProjectId)
    }, err => {
        console.log(err);
        }
    );
      
  }

  onPutToSomewhen(task: Task) {
      alert("The status of " + task.title + " was changed to somewhen");
      const originProjectId: number = task.project.id;
      const editTask = task;
      editTask.project.id = 3;
      editTask.project.title = "Irgendwann";
      this.tasksService.updateTask(editTask).subscribe((data) => {
          this.reloadTaskByProject(originProjectId);
          console.log(originProjectId)
      }, err => {
          console.log(err);
        
      }
    );
  }

  ngOnChanges() {
      this.reloadTasksByDueDate(this.selectedDate);
  }

}
