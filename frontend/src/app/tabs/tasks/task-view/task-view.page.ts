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
  public allProjects: Project[];
  public allTags: Tag[];
  public tagList: string[] = [];
  public project: string = ""

  constructor(private activatedRoute: ActivatedRoute, private tasksService: TasksService,
    private projectsService: ProjectsService, private tagsService: TagsService) { }

  ngOnInit() {
    this.taskId = this.activatedRoute.snapshot.paramMap.get('id');
    this.tasksService.getTaskById(this.taskId).subscribe((editTask: Task) => {
      this.editTask = editTask;
      this.project = this.editTask.project.title
      for (const tag of this.editTask.tags) {
        this.tagList.push(tag.title)
      }

      this.tagsService.getAllTags().subscribe((tags: Tag[]) => {
        this.allTags = tags;
      })
    }),

      this.projectsService.getAllProjects().subscribe((projects: Project[]) => {
        this.allProjects = projects;
      })
  }

  overrideTask() {
    for (const tagname of this.tagList) {
      for (const tag of this.allTags) {
        if (tagname === tag.title) {
          if (this.editTask.tags.length === 0) {
            this.editTask.tags.push(tag)
          }
          for (const tasktag of this.editTask.tags) {
            if (tasktag.title === tag.title) {
              break
            } else {
              this.editTask.tags.push(tag)
            }
          }
        }
      }
    }

    for (const project of this.allProjects) {
      if (project.title === this.project) {
        this.editTask.project = project
      }
    }
    this.tasksService.updateTask(this.editTask).subscribe((data) => { });
  }
}
