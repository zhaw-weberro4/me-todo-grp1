
export class Project {
    public id: number;
    public name: string;
    public predefined: boolean;


    constructor(id: number, name: string, predefined: boolean) {
        this.id = id;
        this.name = name;
        this.predefined = predefined;
    }
}
