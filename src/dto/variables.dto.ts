import type { VariableType } from "@prisma/client";

// DTOs of vars accesed in app after extracting from page variables

type PageVariableBaseDTO = {
    id: string;
    name: string;
    tag: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
};

export type TextVariableDTO = PageVariableBaseDTO & {
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
};

export type BannerVariableDTO = PageVariableBaseDTO & {
    type: (typeof VariableType)["BANNER"];
    images: BannerImageDTO[];
};

export type PageVariableDTO = TextVariableDTO | BannerVariableDTO;
