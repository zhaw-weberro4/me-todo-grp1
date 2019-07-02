
export class Tag {
    public id: number;
    public title: string;
    public user: string;


    constructor(id: number, title: string, user?: string) {
        this.id = id;
        this.title = title;
        this.user = user;
    }
}
