export interface FileUploadProps {
    uploadStore: UploadStroeType;
}

export interface UploadStroeType {
    fileId: string,
    uploadExcel: (data: any) => void;
}