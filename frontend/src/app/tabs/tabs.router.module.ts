import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tasks',
        children: [
          {
            path: 'tasks',
            loadChildren: './tasks/tasks.module#TasksPageModule'
          }
          ,
          {
            path: '', 
            loadChildren: './filter/filter.module#FilterPageModule'
          }
        ]
      },
      {
        path: 'today',
        children: [
          {
            path: '',
            loadChildren: './tasks/tasks.module#TasksPageModule'
          }
        ]
      },
      {
        path: 'calendar',
        children: [
          {
            path: '',
            loadChildren: './calendar/calendar.module#CalendarPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/timerecord',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/timerecord',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
