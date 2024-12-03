// DTOs of vars accesed in app after extracting from page variables

export type TextVariableDTO = {
    id: string;
    value: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export type BannerImageDTO = {
    id: string;
    imageName: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
};

export type BannerVariableDTO = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    images: BannerImageDTO[];
};
