import bcryt from 'bcryptjs';
import validator from 'validator';
var salt = bcryt.genSaltSync(10);

export class User {
    private uid?: string | number;
    private firstname?: string;
    private username?: string;
    private profile?: string;
    private lastname?: string;
    private email?: string;
    private password?: string;
    private mobile?: string
    private religion?: string;
    private isblock?: boolean;
    private isonline?: boolean;

    constructor(email?: string, password?: string, mobile?: string, uid?: string | number, religion?: string, firstname
        ?: string, lastname?: string, username?: string, profile?: string, isblock?: boolean, isonline?: boolean) {
        this.email = validator.isEmail(email??'')? email:undefined;
        this.password = bcryt.hashSync(password ?? '', salt);
        this.mobile = validator.isMobilePhone(mobile??'')? mobile:undefined;
        this.firstname = firstname;
        this.lastname = lastname;
        this.uid = uid;
        this.username = username??email?.substr(email.indexOf("@")),
        this.profile = profile;
        this.religion = religion;
        this.isonline = isonline;
        this.isblock = isblock;
    }
    public getIsblock(): boolean | undefined {
        return this.isblock;
    }

    public setIsblock(isblock: boolean): void {
        this.isblock = isblock;
    }

    public getIsonline(): boolean | undefined {
        return this.isonline;
    }

    public setIsonline(isonline: boolean): void {
        this.isonline = isonline;
    }
    public getUid(): string | number | undefined {
        return this.uid;
    }

    public setUid(uid: string | number): void {
        this.uid = uid;
    }

    public getFirstname(): string | undefined {
        return this.firstname;
    }

    public setFirstname(firstname: string): void {
        this.firstname = firstname;
    }

    public getUsername(): string | undefined {
        return this.username;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public getProfile(): string | undefined {
        return this.profile;
    }

    public setProfile(profile: string): void {
        this.profile = profile;
    }

    public getLastname(): string | undefined {
        return this.lastname;
    }

    public setLastname(lastname: string): void {
        this.lastname = lastname;
    }

    public getEmail(): string | undefined {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = validator.isEmail(email)?email:undefined;
    }

    public getPassword(): string | undefined {
        return this.password;
    }
    public comparePassword(password: string): boolean {
        return bcryt.compareSync(password, this.password ?? '');
    }

    public setPassword(password: string): void | undefined {
        this.password = bcryt.hashSync(password, salt);
    }

    public getMobile(): string | undefined {
        return this.mobile;
    }

    public setMobile(mobile: string): void {
        this.mobile = mobile;
    }

    public getReligion(): string | undefined {
        return this.religion;
    }

    public setReligion(religion: string): void {
        this.religion = religion;
    }
    public static InstanceOf(): User {
        return new User();
    }
    public static UserBuilder() {
        return new UserBuilder();
    }

}

export class UserBuilder {
    private user: User;
    constructor(user?:User) {
        this.user = user??new User();
    }
    public setIsblock(isblock: boolean): UserBuilder {
        this.user.setIsblock(isblock);
        return this;
    }
    public setIsonline(isonline: boolean): UserBuilder {
        this.user.setIsonline(isonline);
        return this;
    }
    public setUid(uid: string | number): UserBuilder {
        this.user.setUid(uid);
        return this;
    }
    public setMobile(mobile: string): UserBuilder {
        this.user.setMobile(mobile);
        return this;
    }
    public setReligion(religion: string): UserBuilder {
        this.user.setReligion(religion);
        return this;
    }
    public setPassword(password: string): UserBuilder {
        this.user.setPassword(password);
        return this
    }

    public setEmail(email: string): UserBuilder {
        this.user.setEmail(email);
        return this;
    }

    public setLastname(lastname: string): UserBuilder {
        this.user.setLastname(lastname);
        return this;
    }
    public setProfile(profile: string): UserBuilder {
        this.user.setProfile(profile);
        return this;
    }
    public setUsername(username: string): UserBuilder {
        this.user.setUsername(username);
        return this;
    }
    public setFirstname(firstname: string): UserBuilder {
        this.user.setFirstname(firstname);
        return this;
    }
    public getUser() {
        return this.user;
    }
}