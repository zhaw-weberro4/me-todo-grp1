import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { Router } from '@angular/router';
import { Project } from 'src/app/model/project'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  constructor(private router: Router, private projectsService: ProjectsService, public alertController: AlertController) { }
  public allProjects: Project[] = [];

  ngOnInit() {
    this.reloadAllProjects();
  }

  public reloadAllProjects() {
    this.allProjects = this.projectsService.allProjects;
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

}
