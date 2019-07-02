import { Injectable } from '@angular/core';
import { Tag } from '../model/tag'

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  allTags: Tag[] = [
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
  ]

  constructor() { }
}
