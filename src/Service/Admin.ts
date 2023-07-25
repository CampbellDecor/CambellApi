import CambellStore from '../FireBase/FireStore'
import { Model } from '../Model/Model';
import Service from './Service';

class Admin implements Service{
    addService(model: Model): string;
    addService(model: Model, id: string): string;
    addService(model: unknown, id?: unknown): string {
        throw new Error('Method not implemented.');
    }
    editService(model: Model): Model;
    editService(model: Model, id: string): Model;
    editService(model: unknown, id?: unknown): Model {
        throw new Error('Method not implemented.');
    }
    FindByID(id: string | number): Model {
        throw new Error('Method not implemented.');
    }
    getAll(): Model[] {
        throw new Error('Method not implemented.');
    }
    deleteService(model: Model):any;
    deleteService(model: string):any;
    deleteService(model: unknown): any {
        throw new Error('Method not implemented.');
    }
    sort(): Model[];
    sort(field: string): Model[];
    sort(field?: unknown): Model[] {
        throw new Error('Method not implemented.');
    }
    isExist(model: string): boolean;
    isExist(model: Model): boolean;
    isExist(model: unknown): boolean {
        throw new Error('Method not implemented.');
    }
    search(model: string):any;
    search(model: Object):any;
    search(model: unknown): any {
        throw new Error('Method not implemented.');
    }
    
}