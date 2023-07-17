import {FireAuth} from '../FireBase/FireAuth';
import {User,UserBuilder} from '../Model/User'

export function add(user:User|UserBuilder|Array<User|UserBuilder>): boolean|undefined{
    try {
        
        return true;
    } catch (error) {
        throw error;
    }

}