import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './add-task/add-task.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [AddTaskComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    AddTaskComponent
  ]
})
export class ComponentsModule { }
