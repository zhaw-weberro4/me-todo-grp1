
export class Project {
    public id: number;
    public title: string;
    public standard: boolean;
    public user: string;


    constructor(id: number, title: string, standard: boolean, user?: string) {
        this.id = id;
        this.title = title;
        this.standard = standard;
        this.user = user;
    }
}
