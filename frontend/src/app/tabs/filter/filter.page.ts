import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { Router } from '@angular/router';
import { Project } from 'src/app/model/project'
import { Tag } from 'src/app/model/tag'
import { Task } from 'src/app/model/task'
import { AlertController } from '@ionic/angular';
import { TagsService } from 'src/app/services/tags.service';
import {TasksService} from "../../services/tasks.service";


@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  constructor( private router: Router, private projectsService: ProjectsService,
               private tagsService: TagsService, public alertController: AlertController,
               private tasksService: TasksService) { }

  public allProjects: Project[] = [];
  public allTags: Tag[] = [];
  public allTasks: Task[] = [];

  ngOnInit() {
    this.reloadAllProjects();
    this.reloadAllTags();
    this.reloadAllTasks();
  }

  public reloadAllTasks() {
      this.tasksService.getAllTasks().subscribe((tasks: Task[]) => {
          this.allTasks = tasks;
      })
  }

  public reloadAllProjects() {
    this.projectsService.getAllProjects().subscribe((projects: Project[]) => {
/*       for (const project of projects) {
        console.log(project);
      } */
      this.allProjects = projects;
    });
  }

  public reloadAllTags() {
    this.tagsService.getAllTags().subscribe((tags: Tag[]) => {
      this.allTags = tags;
    });
  }

  async addProject() {
    const alert = await this.alertController.create({
      header: 'Projekt hinzufügen',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Projektname'
        }
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Hinzufügen',
          handler: (data) => {
            if (data.title != null && data.title != "") {
              let newProject = new Project(0, data.title, false, "user");
              this.projectsService.addNewProject(newProject).subscribe(
                data => {
                  console.log("Successfully added new project.");
                  this.reloadAllProjects();
                }, err => {
                  console.log(err);
                  this.router.navigateByUrl('/login');
                }
              );
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async addTag() {
    const alert = await this.alertController.create({
      header: 'Tags hinzufügen',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Tagname'
        }
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Hinzufügen',
          handler: (data) => {
            if (data.title != null && data.title != "") {
              let newTag = new Tag(0, data.title, "user");
              this.tagsService.addNewTag(newTag).subscribe(
                data => {
                  console.log("Successfully added new tag.");
                  this.reloadAllTags();
                }, err => {
                  console.log(err);
                  this.router.navigateByUrl('/login');
                }
              );
            }
          }
        }
      ]
    });
    await alert.present();
  }

  deleteProject(project: Project) {
    this.projectsService.deleteProject(project).subscribe(
      data => {
        console.log("Successfully delete project.");
        this.reloadAllProjects();
      }, err => {
        console.log(err);
        this.router.navigateByUrl('/login');
      }
    )
  }

  deleteTag(tag: Tag) {
    this.tagsService.deleteTag(tag).subscribe(
      data => {
        console.log("Successfully delete tag.");
        this.reloadAllTags();
      }, err => {
        console.log(err);
        this.router.navigateByUrl('/login');
      }
    )
  }

  countTasks(item, typ = 'project') {
    let i = 0;
    for(const task of this.allTasks) {
      if(typ === 'project') {
        if (task.project.id === item.id) {
            i++;
        }
      } else if(typ === 'tag') {
        for(const tag of task.tags) {
            if (tag.id === item.id) {
                i++;
            }
        }
      }
    }
    return i;
  }

  onOpenProject(projectId: number){
    this.router.navigate(['/tabs/tasks/project/', projectId]);
  }

  onOpenTimeQuery(startDate: Date, endDate: Date) {

    endDate.setDate(endDate.getDate() + 7);

    const startDateString = startDate.toISOString();
    const endDateString = endDate.toISOString();
    const link = "/tabs/tasks/time/" + startDateString + "/" + endDateString;
     this.router.navigate(['/tabs/tasks/time/', startDateString, endDateString]);
  }

  weekDate(weekPoint: String): Date {
    if (weekPoint === "start") {
      return new Date();
    } else {
      return new Date();
    }
  }
}
