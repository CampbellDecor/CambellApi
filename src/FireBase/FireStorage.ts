import fire from './Firebase';
const Budget=fire.storage().bucket();
class Stroage{
    static async upload(localFilePath:string,storageFilepath:string){
        try {
            await Budget.upload(localFilePath, {
              destination: storageFilepath
            });
            
            return 'File uploaded successfully.';
          } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
          }
    }
}
