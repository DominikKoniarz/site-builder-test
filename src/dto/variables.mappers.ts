import type { DbFetchedVariable } from "@/types/variables";
import type { BannerVariableDTO, TextVariableDTO } from "./variables.dto";

export const createPageVariableDTO = (
    variable: DbFetchedVariable,
): TextVariableDTO | BannerVariableDTO => {
    if (variable.textVariable) {
        return {
            id: variable.textVariable.id,
            name: variable.templateVariable.name,
            tag: variable.templateVariable.tag,
            type: variable.templateVariable.type as "TEXT",
            value: variable.textVariable.value,
            order: variable.templateVariable.order,
            createdAt: variable.textVariable.createdAt,
            updatedAt: variable.textVariable.updatedAt,
        } satisfies TextVariableDTO;
    } else if (variable.bannerVariable) {
        return {
            id: variable.bannerVariable.id,
            name: variable.templateVariable.name,
            tag: variable.templateVariable.tag,
            type: variable.templateVariable.type as "BANNER",
            order: variable.templateVariable.order,
            images: variable.bannerVariable.images.map((image) => ({
                id: image.id,
                imageName: image.imageName,
                order: image.order,
                createdAt: image.createdAt,
                updatedAt: image.updatedAt,
                cropHeight: image.cropHeight,
                cropWidth: image.cropWidth,
                cropX: image.cropX,
                cropY: image.cropY,
            })),
            createdAt: variable.bannerVariable.createdAt,
            updatedAt: variable.bannerVariable.updatedAt,
        } satisfies BannerVariableDTO;
    } else {
        throw new Error("No variable matched");
    }
};
