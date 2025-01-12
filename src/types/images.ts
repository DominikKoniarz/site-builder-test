export type CropData = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export type RemovedBannerImage = {
    id: string;
    pageId: string;
    pageVariableId: string;
    imageName: string;
};

export type ChangedBannerImage = {
    id: string;
    pageId: string;
    pageVariableId: string;
    bannerVariableId: string;
    imageName: string;
    order: number;
    isCropDataChanged: boolean;
    cropData: CropData | null;
};
