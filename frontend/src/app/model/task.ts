import {Project} from './project';
import {Tag} from './tag';

export class Task {
    public id: number;
    public title: string;
    public description: string;
    public dueDate: Date;
    public project: Project;
    public tags: Tag[];
    public done: boolean;
    public user: string;
}
