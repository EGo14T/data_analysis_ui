import { Table } from 'antd';
import { inject, observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { DataDisplayProps } from './types';




function DataDisplay(props: DataDisplayProps) {
    useEffect(() => {
        const { fileId } = props.uploadStore;
        fileId && props.dataDisplayStore.getProcessData(fileId);
    }, [props.uploadStore.fileId])

    const getDataSource = () => {
        const { contents } = props.dataDisplayStore;
        const dataSource: any[] = contents.map((item: any, index: number) => ({ ...item, key: index }))
        return dataSource
    }


    const getColums = () => {
        const { labels } = props.dataDisplayStore
        const columns = labels.map(item => ({ title: item, dataIndex: item, key: item }))
        return columns;
    }

    return (
        <> <h1 style={{
            fontWeight: "500", fontSize: "30px"
        }}>数据展示</h1>
            <Table dataSource={getDataSource()} columns={getColums()}  pagination={false}/>
            <div>{props.uploadStore.fileId}</div>
        </>
    )
}

export default inject('uploadStore', 'dataDisplayStore')(observer(DataDisplay));
