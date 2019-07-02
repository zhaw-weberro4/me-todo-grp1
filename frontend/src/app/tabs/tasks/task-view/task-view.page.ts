import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.page.html',
  styleUrls: ['./task-view.page.scss'],
})
export class TaskViewPage implements OnInit {

  taskId = null;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.taskId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  

}
