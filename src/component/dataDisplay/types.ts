import { UploadStroeType } from "../upload/types";

export interface DataDisplayProps {
    dataDisplayStore: DataDisplaystoreType;
    uploadStore: UploadStroeType
}

export interface DataDisplaystoreType {
    getProcessData: (fileId: string, labels?: string[]) => void;
    contents: any[];
    labels: any[];
}