import axios, { AxiosRequestConfig } from 'axios';
import { message } from 'antd'

//基础URL，axios将会自动拼接在url前

//默认请求超时时间
const timeout = 30000;

//创建axios实例
const service = axios.create({
    timeout,
    // baseURL,
    //如需要携带cookie 该值需设为true
    withCredentials: true
});

//统一请求拦截 可配置自定义headers 例如 language、token等
// service.interceptors.request.use(
//     (config: AxiosRequestConfig) => {
//         //配置自定义请求头
//         let customHeaders: AxiosRequestHeaders = {
//             language: 'zh-cn'
//         };
//         config.headers = customHeaders;
//         return config
//     },
//     error => {
//         console.log(error)
//         Promise.reject(error)
//     }
// )

//axios返回格式
interface axiosTypes<T> {
    data: T;
    status: number;
    statusText: string;
}

//后台响应数据格式
//###该接口用于规定后台返回的数据格式，意为必须携带code、msg以及result
//###而result的数据格式 由外部提供。如此即可根据不同需求，定制不同的数据格式
interface responseTypes<T> {
    code: number,
    msg: string,
    result: T
}

//核心处理代码 将返回一个promise 调用then将可获取响应的业务数据
const requestHandler = <T>(method: 'get' | 'post' | 'put' | 'delete', url: string, params: object = {}, config: AxiosRequestConfig = {}): Promise<T> => {
    let response: Promise<axiosTypes<responseTypes<T>>>;
    switch (method) {
        case 'get':
            response = service.get(url, { params: { ...params }, ...config });
            break;
        case 'post':
            response = service.post(url, { ...params }, { ...config });
            break;
        case 'put':
            response = service.put(url, { ...params }, { ...config });
            break;
        case 'delete':
            response = service.delete(url, { params: { ...params }, ...config });
            break;
    }

    return new Promise<T>((resolve, reject) => {
        response.then((res: any) => {
            //业务代码 可根据需求自行处理
            if (res.data.code !== 20000) {
                //数据请求错误 使用reject将错误返回
                reject(res);
                
            } else {
                //数据请求正确 使用resolve将结果返回
                resolve(res.data);
            }

        }).catch(error => {
            let e = JSON.stringify(error);
            message.warn(`网络错误：${e}`);
            console.log(`网络错误：${e}`)
            reject(error);
        })
    })
}

// 使用 request 统一调用，包括封装的get、post、put、delete等方法
const request = {
    get: <T>(url: string, params?: object, config?: AxiosRequestConfig) => requestHandler<T>('get', url, params, config),
    post: <T>(url: string, params?: object, config?: AxiosRequestConfig) => requestHandler<T>('post', url, params, config),
    put: <T>(url: string, params?: object, config?: AxiosRequestConfig) => requestHandler<T>('put', url, params, config),
    delete: <T>(url: string, params?: object, config?: AxiosRequestConfig) => requestHandler<T>('delete', url, params, config)
};

// 导出至外层，方便统一使用
export { request };