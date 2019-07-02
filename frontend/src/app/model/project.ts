
export class Project {
    public id: number;
    public name: string;
    public standard: boolean;
    public user: string;


    constructor(id: number, name: string, standard: boolean, user?: string) {
        this.id = id;
        this.name = name;
        this.standard = standard;
        this.user = user;
    }
}
