import Dao from './Dao';



export default class UserDao extends Dao{
    constructor(){
        super("user");
    }
    async getall(){
      try {

        const userCrd=this.store.getAll();
        return userCrd;
      } catch (error) {
        throw error;
      }
    }

}
export class userActivity extends Dao{
    constructor(dao:string){
        super(dao);
    }
    async getallforuser(activity:Array<String>){
        const activitys=[];
        try {
          const activities=await this.store.getGroup(activity);
          return activities;
        } catch (error) {
          throw error;
        }
      }
}