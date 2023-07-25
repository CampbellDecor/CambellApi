import {Model} from './Model'
export default class OurService extends Model{
    private ServiceCode:string;
    private ServiceName:string;
    private rating:number;
    private Images:Array<string>=[];
    private description:string="";
    private ServiceId:string;
    constructor(ServiceCode?:string,ServiceName?:string,rating?:number,ServiceId?:string){
        super();
        this.ServiceCode=ServiceCode as string;
        this.ServiceName=ServiceName as string;
        this.rating=rating??0;
        this.ServiceId=ServiceId as string;
    }
    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }
    public getServiceCode(): string {
        return this.ServiceCode;
    }

    public setServiceCode(ServiceCode: string): void {
        this.ServiceCode = ServiceCode;
    }

    public getServiceName(): string {
        return this.ServiceName;
    }

    public setServiceName(ServiceName: string): void {
        this.ServiceName = ServiceName;
    }

    public getRating(): number {
        return this.rating;
    }

    public setRating(rating: number): void {
        this.rating = rating;
    }

    public getImages(): Array<string> {
        return this.Images;
    }

    public setImages(Images: Array<string>): void {
        this.Images = Images;
    }

   
    instansof(){
        return this;
    }
    getId(): number | String | undefined {
        return this.ServiceId;
    }
    fixedId(id: string | number): Model {
        this.ServiceId=id as string;
        return this;
    }



}