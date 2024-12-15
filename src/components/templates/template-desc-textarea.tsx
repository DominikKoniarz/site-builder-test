import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import useTemplateForm from "@/hooks/useTemplateForm";
import { Textarea } from "../ui/textarea";

export default function TemplateDescTextarea() {
    const { control } = useTemplateForm();

    return (
        <FormField
            control={control}
            name="description"
            render={({ field }) => (
                <FormItem className="space-y-1">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder="Describe template"
                            className="resize-none"
                            {...field}
                            value={field.value ?? ""}
                            // onChange={}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
