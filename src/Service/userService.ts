import CambellStore from '../FireBase/FireStore'
import User from '../Model/User';
import Service from './Service';

export default class Service_user implements Service{
    addService(model: User): string;
    addService(model: User, id: string): string;
    addService(model: unknown, id?: unknown): string {
        throw new Error('Method not implemented.');
    }
    editService(model: User): User;
    editService(model: User, id: string): User;
    editService(model: unknown, id?: unknown): User {
        throw new Error('Method not implemented.');
    }
    FindByID(id: string | number): User {
        throw new Error('Method not implemented.');
    }
    getAll(): User[] {
        throw new Error('Method not implemented.');
    }
    deleteService(model: User):any;
    deleteService(model: string):any;
    deleteService(model: unknown): any {
        throw new Error('Method not implemented.');
    }
    sort(): User[];
    sort(field: string): User[];
    sort(field?: unknown): User[] {
        throw new Error('Method not implemented.');
    }
    isExist(model: string): boolean;
    isExist(model: User): boolean;
    isExist(model: unknown): boolean {
        throw new Error('Method not implemented.');
    }
    search(model: string):any;
    search(model: Object):any;
    search(model: unknown): any {
        throw new Error('Method not implemented.');
    }

}