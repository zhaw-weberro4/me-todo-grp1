
export class Tag {
    public id: number;
    public name: string;
    public user: string;


    constructor(id: number, name: string, user?: string) {
        this.id = id;
        this.name = name;
        this.user = user;
    }
}
