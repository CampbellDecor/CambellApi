
import fire, { storage } from './Fire'
class FireStorage{
    FireStorageB = storage().bucket();
    private Folder: any;
    constructor(Folder?:string){
        this.Folder=Folder??'';
    }
    async add(localFilePath:string,filename?:string){

        try {
            let type:string=localFilePath.substr(localFilePath.lastIndexOf("."));
            let storagepath:string=`${this.Folder}/${filename}.${type}`;
            await this.FireStorageB.upload(localFilePath,{
                destination:storagepath
            });
            const file = await this.FireStorageB.file(storagepath);
            const [url] = await file.getSignedUrl({
              action: 'read',
              expires: Date.now() + 60 * 60 * 1000*2, // 1 hour
            });
            return {
                storagepath,
                url,
                type,
                filename
            }
        } catch (error) {
            throw error;
        }
    }
    async showfile(storagepath:string){
        try {
            const file = await this.FireStorageB.file(storagepath);
            const [exists] = await file.exists();
            if(exists){
                const [url] = await file.getSignedUrl({
                    action: 'read',
                    expires: Date.now() + 60 * 60 * 1000*2, // 1 hour
                  });
                  return {
                      storagepath,
                      url,
                  }
            }
            else{
                throw Error("Not Found");
            }
           
        } catch (error) {
            throw error;
        }
    }
    async download(filename:string, localbase:string) {
        try {

            const storageFilePath=`${this.Folder}/${filename}`;
            const localFilePath=`${localbase??'./'}/${filename.substring(0,4)+Math.floor(Math.random()*1000)}`
          const file=await this.FireStorageB.file(storageFilePath)
          const [exists]=await file.exists();
          if(exists){
            await file.download({
                destination: localFilePath
              });
          
              return localFilePath;
        }else{
            throw Error("Not Found");
        }
         
        }catch (error) {
          console.error('Error downloading file:', error);
          throw error;
        }
      }
      async delete(filename:string) {
        try {
            const storageFilePath=`${this.Folder}/${filename}`;
            const file= await this.FireStorageB.file(storageFilePath);
            const [exists]=await file.exists();
                if(exists){
                    await file.delete();
                }else{
                    throw Error("Not Found");
                }
        } catch (error) {
          console.error('Error deleting file:', error);
          throw error;
        }
      }
}