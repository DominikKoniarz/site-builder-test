import { CropData } from "@/types/images";
import sharp from "sharp";

sharp.cache(false);

export const getMetadata = (image: ArrayBuffer | Buffer | Uint8Array) => {
    return sharp(image).metadata();
};

export const cropAndResizeImage = (
    image: ArrayBuffer | Buffer | Uint8Array,
    cropData: CropData,
    width: number,
    height: number,
) => {
    return sharp(image)
        .extract({
            left: cropData.x,
            top: cropData.y,
            width: cropData.width,
            height: cropData.height,
        })
        .resize(width, height)

        .toBuffer();
};

export const resizeImage = (
    image: ArrayBuffer | Buffer | Uint8Array,
    width: number,
    height: number,
) => {
    return sharp(image)
        .resize(width, height, {
            fit: "cover",
        })
        .toBuffer();
};
