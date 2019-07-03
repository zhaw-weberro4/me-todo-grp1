import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  public link: String = "";

  ngOnInit() {
    const todayDate = new Date().toISOString();

    this.link = "/tabs/today/" + todayDate;
  }

}
