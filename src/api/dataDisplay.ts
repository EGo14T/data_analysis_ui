import { request } from '../utils/request';

const { post } = request;

export const getProcessData = (fileId: string, labels?: string[]) => {
    const url = `/data_process/getProcessData?fileId=${fileId}`;
    const data = labels || [];
    return post(url, { labels: data })
};
