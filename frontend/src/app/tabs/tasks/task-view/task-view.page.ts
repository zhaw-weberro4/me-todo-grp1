import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/model/task';
import { ProjectsService } from 'src/app/services/projects.service';
import { Project } from 'src/app/model/project';
import { TagsService } from 'src/app/services/tags.service';
import { Tag } from 'src/app/model/tag';



@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.page.html',
  styleUrls: ['./task-view.page.scss'],
})
export class TaskViewPage implements OnInit {

  taskId = null;
  public editTask: Task = new Task();
  public allProjects: Project [];
  public allTags: Tag[];
  public tagList: Tag[];

  constructor(private activatedRoute: ActivatedRoute, private tasksService: TasksService, 
    private projectsService: ProjectsService, private tagsService: TagsService) { }

  ngOnInit() {
    this.taskId = this.activatedRoute.snapshot.paramMap.get('id');
    this.tasksService.getTaskById(this.taskId).subscribe((editTask: Task) => {
      this.editTask = editTask;
      console.log(editTask.tags)
      this.tagList = this.editTask.tags;

    }),

    this.projectsService.getAllProjects().subscribe((projects: Project[]) => {
      this.allProjects = projects;
    }),

    this.tagsService.getAllTags().subscribe((tags: Tag[]) => {
      this.allTags = tags;
      console.log(this.allTags)
    })
  }

  overrideTask() {
    // TODO Task mit Forulardaten abfüllen und in DB schreiben
  }

  goBack() {
    // TODO eine Forumlarebene zurück
  }
}
