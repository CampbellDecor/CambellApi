export abstract class Model{
    private data?:any;
    abstract getId():String|number|undefined;
    abstract fixedId(id:string|number):Model;
    static setData(data:any):Model{throw new Error("set data must be implement");}
     getData():any{
        return this.data;
    }
}

export abstract class Details<T>{
   abstract getAll():Array<Details<T>>;
}

