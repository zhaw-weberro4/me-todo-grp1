import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { Router } from '@angular/router';
import { Project } from 'src/app/model/project'
import { Tag } from 'src/app/model/tag'
import { AlertController } from '@ionic/angular';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  constructor(private router: Router, private projectsService: ProjectsService, 
    private tagsService: TagsService, public alertController: AlertController) { }
  public allProjects: Project[] = [];
  public allTags: Tag[] = [];

  ngOnInit() {
    this.reloadAllProjects();
    this.reloadAllTags();
  }

  public reloadAllProjects() {
    this.allProjects = this.projectsService.allProjects;
  }

  public reloadAllTags() {
    this.allTags = this.tagsService.allTags;
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
            console.log(data);
            // Todo: Projekt in DB speichern
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
            console.log(data);
            // TODO: Tag in DB speichern
          }
        }
      ]
    });
    await alert.present();
  }

  deleteProject(project: Project) {
    alert("I will delete the project " + project.title);
    // TODO delete project
  }

  deleteTag(tag: Tag) {
    alert("I will delete the Tag " + tag.title);
    // TODO delete tag
  }

}
