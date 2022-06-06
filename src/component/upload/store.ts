import { action, makeObservable, observable, runInAction } from 'mobx';
import { uploadExcel } from '../../api/upload';


export class UploadStore {

    constructor(){
        makeObservable(this);//mbox 6后需要添加这个组件才会更新
    }

    @observable fileId: string = '';
    @action
    uploadExcel = async (data: any) => {
        const result: any = await uploadExcel(data);
        runInAction(() => {
            this.fileId = result.data
            console.log(result.data);
        })
    };
}

const instance = new UploadStore();
export default instance;
