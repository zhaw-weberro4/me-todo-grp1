import {Component, OnInit} from '@angular/core';
import {TasksService} from '../services/tasks.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  public link: String = "";

  constructor(private taskService: TasksService){}

  ngOnInit() {
    const todayDate = new Date().toISOString();

    this.link = "/tabs/today/" + todayDate;

  }

  updateToday(){
    this.taskService.updateToday.emit(true);
  }

}
