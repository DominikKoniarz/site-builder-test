import type { DbFetchedVariable } from "@/types/variables";
import type {
    BannerVariableDTO,
    PageVariableDTO,
    TextVariableDTO,
} from "./variables.dto";

export const createPageVariableDTO = (
    variable: DbFetchedVariable,
): PageVariableDTO => {
    if (variable.textVariable) {
        return {
            id: variable.id,
            textVariableId: variable.textVariable.id,
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
            id: variable.id,
            bannerVariableId: variable.bannerVariable.id,
            name: variable.templateVariable.name,
            tag: variable.templateVariable.tag,
            type: variable.templateVariable.type as "BANNER",
            order: variable.templateVariable.order,
            config: variable.templateVariable.bannerTemplateVariableConfig,
            images: variable.bannerVariable.images.map((image) => ({
                id: image.id,
                imageName: image.imageName,
                order: image.order,
                createdAt: image.createdAt,
                updatedAt: image.updatedAt,
                cropData:
                    (image.cropData && {
                        id: image.cropData.id,
                        x: image.cropData.x,
                        y: image.cropData.y,
                        width: image.cropData.width,
                        height: image.cropData.height,
                    }) ||
                    null,
            })),
            createdAt: variable.bannerVariable.createdAt,
            updatedAt: variable.bannerVariable.updatedAt,
        } satisfies BannerVariableDTO;
    } else {
        throw new Error("No variable matched");
    }
};
