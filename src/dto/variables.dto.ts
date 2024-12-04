import type { VariableType } from "@prisma/client";

// DTOs of vars accesed in app after extracting from page variables

export type PageVariableBaseDTO = {
    id: string;
    name: string;
    tag: string;
    type: VariableType;
    createdAt: Date;
    updatedAt: Date;
};

export type TextVariableDTO = PageVariableBaseDTO & {
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

export type BannerVariableDTO = PageVariableBaseDTO & {
    images: BannerImageDTO[];
};
