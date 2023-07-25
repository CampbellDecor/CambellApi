export abstract class Model{
    private data?:any;
    constructor(data?:any){
       this.data=data;
    }
    abstract getId():String|number|undefined;
    abstract fixedId(id:string|number):Model;
    static setData(data:any):Model{throw new Error("set data must be implement");}
     getData(data:any):any{
        return data;
    }
}