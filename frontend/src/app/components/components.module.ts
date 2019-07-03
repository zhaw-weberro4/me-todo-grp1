import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './add-task/add-task.component';
import { IonicModule } from '@ionic/angular';
import {TaskListComponent} from "./task-list/task-list.component";

@NgModule({
  declarations: [AddTaskComponent, TaskListComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    AddTaskComponent,
    TaskListComponent
  ]
})
export class ComponentsModule { }
