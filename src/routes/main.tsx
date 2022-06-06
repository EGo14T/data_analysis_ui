import { Route, Routes } from 'react-router-dom'
import DataDisplay from '../component/dataDisplay'
import MainLayout from '../component/layout'
import FileUpload from '../component/upload'
import allStore from '../store'

export default function MainRoute() {
    return (
        <Routes>
            <Route path={'/'} element={<MainLayout />}>
                <Route path='/' element={<FileUpload {...allStore} />}></Route>
                <Route path='/upload' element={<FileUpload{...allStore} />}></Route>
                <Route path='/dataDisplay' element={<DataDisplay {...allStore} />}></Route>
            </Route>
        </Routes>
    )
}
