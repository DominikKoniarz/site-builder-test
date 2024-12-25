import { z } from "zod";
import { pageBaseSchema } from "./page-base-schema";
import {
    bannerVariableSchema,
    textVariableSchema,
} from "./page-variables-schemas";

const variablesSchema = z.array(
    z.union([textVariableSchema, bannerVariableSchema]),
);

export const pageEditSchema = pageBaseSchema.extend({
    id: z.string({ invalid_type_error: "Valid pageId is required" }).uuid({
        message: "Valid pageId is required",
    }),
    variables: variablesSchema,
});

export type PageEditSchema = z.infer<typeof pageEditSchema>;
