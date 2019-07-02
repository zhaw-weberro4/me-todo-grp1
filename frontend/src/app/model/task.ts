import {Project} from './project';
import {Tag} from './tag';

export class Task {
    public id: number;
    public title: string;
    public description: string;
    public deadline: Date;
    public project: Project;
    public tags: Tag[];
    public archived: boolean;
    public done: boolean;
    public anytime: boolean;
}
