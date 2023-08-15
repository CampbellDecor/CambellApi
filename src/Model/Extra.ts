//Status
export abstract class Status{
    private ishere:boolean;
    private content?:string;

    constructor(ishere:boolean,content?:string){
        this.ishere=ishere;
        this.content=content;
    }
    public isIshere(): boolean {
        return this.ishere;
    }

    public setIshere(ishere: boolean): void {
        this.ishere = ishere;
    }

    public getContent?(): string|undefined {
        return this.content;
    }

    public setContent?(content?: string|undefined): void {
        this.content = content;
    }



}
interface ActionHistory{
    setHistory(actions:Array<any>):void;
    getHistory():Array<any>|undefined;
    sort(sort?:string):Array<any>|undefined;
}

