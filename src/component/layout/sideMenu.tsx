import { Menu, MenuProps } from 'antd'
import React from 'react'
import {
    FileOutlined,
    EyeOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('文件上传', '/upload', <FileOutlined />),
    getItem('数据展示', '/dataDisplay', <EyeOutlined />),
];
export default function SideMenu() {
    const navigate = useNavigate();
    const onItemClick = (info: any) => {
        const { key } = info;
        navigate(key)
    }

    return (
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={onItemClick} />
    )
}