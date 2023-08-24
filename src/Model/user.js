class User
{
    // constructor ( email="", password=undefined, uid=undefined, mobile=undefined, profile=undefined, address=undefined,username=undefined, isOnline=false )
    // {
    //     this.email = email,
    //     this.password = password;
    //     this.uid = uid;
    //     this.username = username ?? email.substring( 0, email.indexOf( "@" ) );
    //     this.mobile = mobile;
    //     this.profile = profile;
    //     this.address = address;
    //     this.isOnline = isOnline;
    //     this.religion = "unKnown";
    //     this.isBlock = false;
    // }
    set email ( email )
    {
        this.email = email;
    }
    setemail (email)
    {
        this.email = email;
        return this;
    }
    get email ()
    {
        return this.email ;
    }
    set password ( password )
    {
        this.password =password;
    }
    setpassword ( password )
    {
        this.password = password;
        return this;
    }
    get password ()
    {
        return this.password;
    }
    set username (username)
    {
        this.username = username;
    }
    setusername ( username )
    {
        this.username = username;
        return username;
    }
    get username ()
    {
        return this.username;
    }
    set uid ( uid )
    {
        this.uid = uid;
    }
    setuid ( uid )
    {
        this.uid = uid;
        return this;
    }
    get uid ()
    {
        return this.uid;
    }
    set mobile ( mobile )
    {
        this.mobile = mobile;
    }
    setmobile ( mobile )
    {
        this.mobile = mobile;
        return this;
    }
    get mobile ()
    {
        return this.mobile;
    }
    set address (address)
    {
        this.address = address;
    }
    setaddress ( address )
    {
        this.address = address;
        return this;
    }
    get address ()
    {
        return this.address;
    }
    set isOnline ( isOnline )
    {
        this.isOnline = isOnline;
    }
    setisOnline ( isOnline )
    {
        this.isOnline = isOnline;
        return this;
    }
    get isOnline ()
    {
        return this.isOnline;
    }
    set religion ( religion )
    {
        this.religion = religion;
    }
    setreligion (religion)
    {
        this.religion = religion;
    }
    get religion ()
    {
        return this.religion;
    }
    set isBlock ( isBlock )
    {
        this.isBlock = isBlock;
    }
    setisBlock ( isBlock )
    {
        this.isBlock = isBlock;
        return this;
    }
    get isBlock ()
    {
        return this.isBlock;
    }
    set profile (profile)
    {
        this.profile = profile;
    }
    setprofile (profile)
    {
        this.profile = profile;
        return this;
    }
    get profile ()
    {
        return this.profile;
    }
}

const user = new User();
user.email="thanush@"
console.log(user);