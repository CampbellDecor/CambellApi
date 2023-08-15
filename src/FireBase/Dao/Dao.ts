import CambellStore from '../FireStore';
export default abstract class Dao{
    protected store:CambellStore;
    constructor(dao:string){
        this.store=new CambellStore(dao);
    }

}