import {FireAuth} from '../FireBase/FireAuth';
import {User} from '../Model/User'

export function add(user:User): boolean|undefined{
    try {
        
        return true;
    } catch (error) {
        throw error;
    }

}