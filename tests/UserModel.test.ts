import {User,UserBuilder} from '../src/Model/User';

describe('userModel Checkout', () => {
    describe("object create with Different Constractors",()=>{
        const user=new User();
        const user1=new User("thanumahee440@gmail.com","Thanush");
        test("test is it Instance of User",()=>{
            expect(user instanceof User).toBe(true);
        });
       
        test("test is it Instance of User create with email,password",()=>{
            expect(user1 instanceof User).toBe(true);
        });
        describe("Test with user Object attributes",()=>{
                it("all attributes are Undefined",()=>{
                    expect(user.getEmail()).toBeUndefined();
                    expect(user.getFirstname()).toBeUndefined();
                    expect(user.getIsonline()).toBeUndefined();
                    expect(user.getProfile()).toBeUndefined();
                    expect(user.getIsblock()).toBeUndefined();
                })
        })
        describe("Test with user1 Object attributes",()=>{
            it("email and password without other attributes are Undefined",()=>{
                expect(user1.getLastname()).toBeUndefined();
                expect(user1.getFirstname()).toBeUndefined();
                expect(user1.getIsonline()).toBeUndefined();
                expect(user1.getProfile()).toBeUndefined();
                expect(user1.getIsblock()).toBeUndefined();
            })
            it("email and password not undefined",()=>{
                expect(user1.getEmail()).not.toBeUndefined();
                expect(user1.getPassword()).not.toBeUndefined();
            })
            it("Email is thanumahee440@gmail.com",()=>{
                expect(user1.getEmail()).toEqual("thanumahee440@gmail.com");
            })
            it("password is hashed so not equal Thanush",()=>{
                expect(user1.getPassword()).not.toEqual("Thanush");
            })
            it("Compare password true maching with hased password",()=>{
                expect(user1.comparePassword("Thanush")).toBeTruthy();
            })
    })
        
    })
    describe("Object create with Instance of Methode return User istance",()=>{
        const users=User.InstanceOf();
        test("InstaneOf of User",()=>{
            expect(users).toBeInstanceOf(User);
        })
    })
    describe("Object create with UserBuilder",()=>{
        const userb=User.UserBuilder();
        test("InstaneOf of User",()=>{
            expect(userb).toBeInstanceOf(UserBuilder);
        });
        test("step by step building return Instance of UserBuilder",()=>{
            expect(userb.setIsblock(true).
            setEmail("thanuMahee440@gmail.com").
            setMobile("0766859048").setFirstname("Mahendran")
            ).toBeInstanceOf(UserBuilder);
        })
        test("step by step building lastly get user object",()=>{
            expect(userb.setIsblock(true).
            setEmail("thanuMahee440@gmail.com").
            setMobile("0766859048").setFirstname("Mahendran").getUser()
            ).toBeInstanceOf(User);
        })
       
    })
 
    
  });