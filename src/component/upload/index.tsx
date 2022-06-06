import {
    Form,
    Button,
    Upload,
    Input,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FileUploadProps } from './types';
import { useState } from 'react';
import { inject, observer } from 'mobx-react';

const formItemLayout = {
    labelCol: { span: 1 },
    wrapperCol: { span: 6 },
};

const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

function FileUpload(props: FileUploadProps) {
    const [uploadFile, setUploadFile] = useState({});

    const onFinish = (values: any) => {
        const { labelRow, startRow, endRow } = values
        const { uploadExcel } = props.uploadStore
        const data = {
            labelRow,
            startAndEndRow: startRow && endRow ? `${startRow}@${endRow}` : '',
            file: uploadFile,
            sessionId: '1'
        }
        uploadExcel(data)

    };

    // upload控件配置
    const uploadProps = {
        showUploadList: true,
        action: '',
        onRemove: (file: any) => {
            setUploadFile({})
        },

        // 上传动作前将图片赋值给uploadFile，返回false终止上传
        beforeUpload: (file: any) => {
            setUploadFile(file);
            return false;
        },
    };


    return (
        <>
            <h1 style={{
                fontWeight: "500", fontSize: "30px"
            }}>上传文件</h1>
            <div>
                <Form
                    name="data"
                    {...formItemLayout}
                    onFinish={onFinish}
                >
                    <Form.Item name={"labelRow"} label="标签行">
                        <Input />
                    </Form.Item>
                    <Form.Item name={"startRow"} label="起始行">
                        <Input />
                    </Form.Item>
                    <Form.Item name={"endRow"} label="结束行">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="upload"
                        label="文件"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload name='file' {...uploadProps}>
                            <Button icon={<UploadOutlined />}>上传excel文件</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
                <div>{`文件ID：${props.uploadStore.fileId}`}</div>
            </div>

        </>

    );
};

export default inject('uploadStore')(observer(FileUpload));