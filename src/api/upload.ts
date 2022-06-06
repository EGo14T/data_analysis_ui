import { request } from '../utils/request';

const { post } = request;

export const uploadExcel = (data: any) => {
    const url = `/file_process/uploadingFile`;
    let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    return post(url, data, config)
};
