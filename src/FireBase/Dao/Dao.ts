import CambellStore from '../FireStore';
import CambellAuth from "../FireAuth";
export default abstract class Dao{
    protected store:CambellStore;
    protected auth:CambellAuth;
    constructor(dao:string){
        this.store=new CambellStore(dao);
        this.auth=new CambellAuth();
    }

}