export const MAX_IMAGE_UPLOAD_SIZE: number = 10 * 1024 * 1024; // 10MB

export const ALLOWED_IMAGE_TYPES: { [key: string]: readonly string[] } = {
    "image/png": [".png"],
    "image/jpeg": [".jpeg"],
    "image/jpg": [".jpg"],
    "image/webp": [".webp"],
};
