import fire from './Firebase';

let fireStorage=fire.storage();
let Budcket=fireStorage.bucket();
class FireStorage{
    static async upload(localFilePath:string,storageBaseFilepath:string,storagename?:string){
       let  storageFilepath=new FireStorage().renameFile(localFilePath,storageBaseFilepath,storagename);
        try {
            await Budcket.upload(localFilePath, {
              destination: storageFilepath
            });
            const file=Budcket.file(storageFilepath);
            const [url]=await file.getSignedUrl({
              action:'read',
              expires:FireStorage.expriedDate(4)
            })
            return {storageUrl:storageFilepath,
                    url:url}
          } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
          }
    }
    renameFile(url:string,basepath:string,filename?:string):string{
        let type=url.substring((url.lastIndexOf(".")));
        let name=filename!=undefined?filename:url.substring(url.lastIndexOf("/"),url.lastIndexOf("."));
        let storageFilepath=basepath+"/"+name+type;
        return storageFilepath;
    }
    static expriedDate(howlong:number):string{
      let date=new Date();
      return `${date.getFullYear()+100}+${date.getMonth()+1}-${date.getDate()+howlong}`
    }
}
