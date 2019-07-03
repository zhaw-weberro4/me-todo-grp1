import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/model/task';
import { ProjectsService } from 'src/app/services/projects.service';
import { Project } from 'src/app/model/project';



@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.page.html',
  styleUrls: ['./task-view.page.scss'],
})
export class TaskViewPage implements OnInit {

  taskId = null;
  public editTask: Task;
  public allProjects: Project [];

  constructor(private activatedRoute: ActivatedRoute, private tasksService: TasksService, private projectsService: ProjectsService) { }

  ngOnInit() {
    this.taskId = this.activatedRoute.snapshot.paramMap.get('id');
    this.tasksService.getTaskById(this.taskId).subscribe((editTask: Task) => {
      this.editTask = editTask;
    })

    this.projectsService.getAllProjects().subscribe((projects: Project[]) => {
      this.allProjects = projects;
    })
  }

  overrideTask() {
    // TODO Task mit Forulardaten abfüllen und in DB schreiben
  }

  goBack() {
    // TODO eine Forumlarebene zurück
  }
  
  changeTagState() {
    //TODO Tag Status ändern
  }
  


}
