import { Injectable } from '@angular/core';
import { Project } from '../model/project'

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  allProjects: Project[] = [
    {
      id: 1,
      title: "Inbox",
      standard: true,
      user: "user"
    },
    {
      id: 2,
      title: "Irgendwann",
      standard: true,
      user: "user"
    },
    {
      id: 3,
      title: "Archiv",
      standard: true,
      user: "user"
    },
    {
      id: 4,
      title: "Project 1",
      standard: false,
      user: "user"
    },
    {
      id: 5,
      title: "Project 2",
      standard: false,
      user: "user"
    },
    {
      id: 6,
      title: "Project 3",
      standard: false,
      user: "user"
    }
  ]

  constructor() { }
}
