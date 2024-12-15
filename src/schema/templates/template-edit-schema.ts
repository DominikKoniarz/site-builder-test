import { z } from "zod";
import { editTemplateVariablesSchema } from "./template-variables-schemas";
import { templateBaseSchema } from "./template-add-schema";

export const templateEditSchema = templateBaseSchema.extend({
    id: z.string().uuid({ message: "Invalid template id" }),
    variables: editTemplateVariablesSchema,
});

export type TemplateEditSchema = z.infer<typeof templateEditSchema>;
