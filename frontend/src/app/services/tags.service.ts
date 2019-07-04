import { Injectable } from '@angular/core';
import { Tag } from '../model/tag'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Project} from "../model/project";

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  allTags: Tag[] = [];

/*   allTags: Tag[] = [
    {
      id: 1,
      title: "Telefon",
      user: "user"
    },
    {
      id: 2,
      title: "Einkaufen",
      user: "user"
    },
    {
      id: 3,
      title: "Mail",
      user: "user"
    },
  ] */

  constructor(private http: HttpClient) { }

  private apiUrl: String = "http://localhost:8080/api"

  public getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiUrl + '/tags', { withCredentials: true });
  }

  public findById(id: number) {
      return this.http.get<Project>(this.apiUrl + '/tag/' + id, { withCredentials: true });
  }

  public addNewTag(newTag: Tag) {
    return this.http.post(this.apiUrl + '/tag', newTag, { withCredentials: true });
  }

  public deleteTag(tag: Tag) {
    return this.http.delete(this.apiUrl + '/tag/' + tag.id, { withCredentials: true });
  }
}



