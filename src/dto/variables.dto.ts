import type { VariableType } from "@prisma/client";

// DTOs of vars accesed in app after extracting from page variables

type PageVariableBaseDTO = {
    id: string; // id of generic page variable (in db has relations to text or banner var)
    name: string;
    tag: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
};

export type TextVariableDTO = PageVariableBaseDTO & {
    textVariableId: string;
    type: (typeof VariableType)["TEXT"];
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
    cropX: number;
    cropY: number;
    cropWidth: number;
    cropHeight: number;
};

export type BannerVariableDTO = PageVariableBaseDTO & {
    bannerVariableId: string;
    type: (typeof VariableType)["BANNER"];
    images: BannerImageDTO[];
    config: {
        id: string;
        imageHeight: number;
        imageWidth: number;
    } | null;
};

export type PageVariableDTO = TextVariableDTO | BannerVariableDTO;
