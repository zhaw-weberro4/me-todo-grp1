import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from '../../model/task'
import { ProjectsService } from 'src/app/services/projects.service';
import { Project } from 'src/app/model/project';

// TODO: Component testen. Richtige Tasks nehmen statt dummy Daten

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {

  inboxProject: Project;
  newTask: Task =
    {
      id: null,
      title: "",
      description: "",
      dueDate: null,
      project: {
        id: 0,
        title: "",
        standard: false,
        user: "user"
      },
      tags: [],
      done: false,
      user: "user"
    }

  constructor(private router: Router, public alertController: AlertController,
    private taskservice: TasksService, private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectsService.finByName("Inbox").subscribe((project: Project) => {
      this.inboxProject = project;
    });
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
            this.newTask.title = data.title;
            this.newTask.project = this.inboxProject;
            this.taskservice.addNewTask(this.newTask).subscribe((data) => { }
            )
          }
        }
      ]
  });
    await alert.present();
  }

}
