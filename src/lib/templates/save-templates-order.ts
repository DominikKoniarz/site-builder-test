import { updateTemplatesOrder } from "@/data-access/templates";
import { TemplatesOrderSchema } from "@/schema/templates/templates-order-schema";

export const saveTemplatesOrder = async (data: TemplatesOrderSchema) => {
    await updateTemplatesOrder(data);
};
