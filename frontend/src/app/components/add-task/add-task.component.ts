import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from '../../model/task'

// TODO: Component testen. Richtige Tasks nehmen statt dummy Daten

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {

  newTask: Task = 
    {
      id: null,
      title: "",
      description: "",
      dueDate: null,
      project: {
        id: 1,
        title: "Bonfire",
        standard: false,
        user: "user"
      },
      tags: [
        {
          id: 1,
          title: "Finance",
            user: "user"
        }
      ],
      done: false,
      user: "user"
    } 

  constructor(private router: Router, public alertController: AlertController, private taskservice: TasksService) { }

  ngOnInit() {
    
  }
  

  async addTask() {
    const alert = await this.alertController.create({
      header: 'Task hinzufügen',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Taskname'
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
            this.newTask.title = data;
            this.taskservice.addNewTask(this.newTask)
          }
        }
      ]
    });
    await alert.present();
  }

}
