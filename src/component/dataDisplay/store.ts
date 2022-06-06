import { action, makeObservable, observable, runInAction } from 'mobx';
import { getProcessData } from '../../api/dataDisplay';

export class DataDisplaystore {

    constructor() {
        makeObservable(this);
    }

    @observable contents = [];
    @observable labels = [];

    @action
    getProcessData = async (fileId: string, labels?: string[]) => {
        const result: any = await getProcessData(fileId, labels);
        runInAction(() => {
            this.contents = result.data.contents;
            this.labels = result.data.labels;
        })
    };
}

const instance = new DataDisplaystore();
export default instance;
