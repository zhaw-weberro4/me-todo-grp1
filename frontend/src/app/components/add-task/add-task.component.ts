import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {

  constructor(private router: Router, public alertController: AlertController) { }

  ngOnInit() {}

  async addTask() {
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

}
