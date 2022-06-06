import Layout, { Content, } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideMenu from './sideMenu';


export default function MainLayout() {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const onCollapse = (collapsed: boolean) => {
        setCollapsed(collapsed);
    };
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <SideMenu></SideMenu>
            </Sider>
            <Layout className="site-layout">
                <Content style={{ margin: '0 16px' }}>
                    <Outlet></Outlet>
                </Content>
            </Layout>
        </Layout>
    );
}



