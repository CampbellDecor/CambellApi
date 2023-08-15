import User,{UserBuilder} from './User';
class Admin extends User{
    private isadmin?:boolean;

    public isIsadmin?(): boolean|undefined {
        return this.isadmin;
    }

    public setIsadmin(isadmin?: boolean): void {
        this.isadmin = isadmin;
    }

    constructor(isadmin?:boolean){
        super();
        this.isadmin=isadmin;
    }
    
}
class AdminBuilder extends UserBuilder{
    private admin:Admin;
    constructor(admin?:Admin){ 
        super(admin);
        this.admin=admin??new Admin();
    }
      
    public setIsadmin(isadmin:boolean):AdminBuilder{
        this.admin.setIsadmin(isadmin);
        return this;
    }

}