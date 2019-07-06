import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/model/task';
import {ProjectsService} from '../../services/projects.service';
import {TagsService} from "../../services/tags.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  constructor(private router: Router, private tasksService: TasksService,
              private activatedRoute: ActivatedRoute, private projectService: ProjectsService,
              private tagService: TagsService) { }

  taskId: number = 1;
  public allTasks: Task[] = [];
  public newTask: Task = new Task();
  public pageTitle: String = "";

  ngOnInit() {
    this.pageTitle = this.activatedRoute.snapshot.data["pageTitle"];

    // Falls die Tasks aus einem Projekt geladen werden
    if (this.activatedRoute.snapshot.params["projectId"] != null) {
      const projectId: number = this.activatedRoute.snapshot.params["projectId"];
      this.projectService.findById(projectId).subscribe((project) => {
        if (project.standard){
          this.pageTitle = project.title;
        } else {
          this.pageTitle = this.pageTitle + " " + project.title;
        }
      }, (error) => {
        console.log(error);
      })
    // Falls die Tasks aus einem Tag geladen werden
    } else if (this.activatedRoute.snapshot.params["tagId"] != null) {
        const tagId: number = this.activatedRoute.snapshot.params["tagId"];
        this.tagService.findById(tagId).subscribe((tag) => {
            this.pageTitle = this.pageTitle + " " + tag.title;
        }, (error) => {
            console.log(error);
        })

      // Falls die Tasks von einem Datum geladen werden    
    } else if (this.activatedRoute.snapshot.params["startDate"] != null) {
      // Falls die Tasks von Heute geladen werden
    } else if (this.activatedRoute.snapshot.params["todayDate"] != null) {

    }
  }

  // Task hinzufügen wird in der Komponente components/add-task ausgeführt.
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
  // Task abschliessen
  async finish(task: Task) {
      task.done = true;
      this.updateTask(task);
  }
  // Editierten Task in DB speichern
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
  // Taskliste neu laden 
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
  // Task löschen
  deleteTask(task: Task) {
    alert("I will delete the task " + task.title);
  }
}
