import { Injectable } from '@angular/core';
import { Project } from '../model/project'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  allProjects: Project[] = [];


  constructor(private http: HttpClient) { }

  private apiUrl: String = "http://localhost:8080/api"

  public getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl + '/projects', { withCredentials: true });
  }

  public findById(id: number) {
    return this.http.get<Project>(this.apiUrl + '/project/id/' + id, { withCredentials: true });
  }

  public finByName(title: string): Observable<Project> {
    return this.http.get<Project>(this.apiUrl + '/project/' + title, { withCredentials: true });
  }

  public addNewProject(newProject: Project) {
    return this.http.post(this.apiUrl + '/project', newProject, { withCredentials: true });
  }

  public deleteProject(project: Project) {
    return this.http.delete(this.apiUrl + '/project/' + project.id, { withCredentials: true });
  }
}
